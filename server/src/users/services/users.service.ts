import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, ObjectID } from 'typeorm';

import { User } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) protected readonly repository: Repository<User>
  ) {}

  async assertUsernameAndEmail(options: {
    id?: ObjectID;
    email: string;
    username: string;
  }) {
    if (options.email) {
      let userOfEmail: { user };
      try {
        userOfEmail = await this.findByEmail(options);
      } catch (error) {
        userOfEmail = undefined;
      }
      if (userOfEmail && userOfEmail.user.id !== options.id) {
        throw new ConflictException(
          `User with email "${options.email}" exists.`
        );
      }
    }
    if (options.username) {
      let userOfUsername: { user };
      try {
        userOfUsername = await this.findByUserName(options);
      } catch (error) {
        userOfUsername = undefined;
      }
      if (userOfUsername && userOfUsername.user.id !== options.id) {
        throw new ConflictException(
          `User with username "${options.username}" exists.`
        );
      }
    }
  }

  async create(options: { item: User }) {
    try {
      // await this.assertUsernameAndEmail({
      //   id: options.item.id,
      //   email: '', // options.item.email,
      //   username: '', // options.item.username,
      // });
      options.item = await this.repository.save(options.item);
      // const { user } = await this.findById({ id: options.item.id })
      const user = options.item;
      return { user };
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(options: { email: string }) {
    try {
      const user = await this.repository.findOneOrFail({
        where: {
          email: options.email,
        },
      });

      return {
        user,
      };
    } catch (error) {
      throw new NotFoundException(
        `User with email "${options.email}" not found.`
      );
    }
  }

  async findByUserName(options: { username: string }) {
    try {
      const user = await this.repository.findOneOrFail({
        where: {
          username: options.username,
        },
      });

      return {
        user,
      };
    } catch (error) {
      throw new NotFoundException(
        `User with username "${options.username}" not found.`
      );
    }
  }

  async findByProviderId(options: { provider: string; id: string }) {
    try {
      const searchCriteria = {
        'providers.name': options.provider,
        'providers.id': options.id,
      };

      const user = await this.repository.findOneOrFail({
        where: searchCriteria,
      });

      return {
        user,
      };
    } catch (error) {
      throw new NotFoundException(
        `User with provider "${options.provider}:${options.id}" not found.`
      );
    }
  }
}
