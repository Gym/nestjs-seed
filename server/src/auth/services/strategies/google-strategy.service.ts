import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  Logger,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// import { GroupsService, User } from '@rucken/core-nestjs';
import { plainToClass } from 'class-transformer';
import { Strategy, StrategyOptions } from 'passport-google-oauth2';
import { GOOGLE_OAUTH2_CONFIG_TOKEN } from '../../configs/google-oauth2.config';
import { UsersService, User } from '../../../users';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(GOOGLE_OAUTH2_CONFIG_TOKEN)
    protected readonly options: StrategyOptions,
    protected readonly users: UsersService
  ) {
    super({ ...options, passReqToCallback: true } as StrategyOptions);
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: (err, user?: User, info?: any) => void
  ) {
    try {
      let user: User;

      try {
        const { user: existingUser } = await this.users.findByProviderId({
          provider: profile.provider,
          id: profile.id,
        });

        user = existingUser;
      } catch (e) {
        if (!(e instanceof NotFoundException)) {
          throw e;
        }
      }

      if (!user) {
        const { user: newUser } = await this.users.create({
          item: {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            displayName: profile.displayName,
            emails: [{ address: profile.email, isPrimary: true }],
            providers: [
              {
                name: profile.provider,
                id: profile.id,
                profile: profile._json,
                accessToken,
                refreshToken,
              },
            ],
          },
        });

        console.log('newUser', newUser);

        const info = {
          flow: 'registration',
          name: profile.provider,
          id: profile.id,
          suggested_username: this.generateUsername(profile),
          suggested_email: profile.emails ? profile.emails[0].value : undefined,
          accessToken,
        };

        return done(null, null, info);
      }

      done(null, user);
    } catch (err) {
      // console.log(err)
      done(err);
    }
  }

  protected generateUsername(profile) {
    let username = '';

    if (profile.username) {
      username = profile.username;
    } else if (profile.emails) {
      username = profile.emails[0].value.split('@')[0];
    } else if (profile.name) {
      username = profile.name.givenName[0] + profile.name.familyName;
    }

    return username.toLowerCase();
  }
}
