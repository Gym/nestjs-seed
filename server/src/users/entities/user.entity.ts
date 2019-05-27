import { find, result } from 'lodash';
import {
  ObjectID,
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Email } from './email.entity';
import { Provider } from './provider.entity';

@Entity({ name: 'users' })
export class User {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  displayName: string;

  @Column(type => Email)
  emails: Email[];

  // username: string;
  // password: string;
  // salt: string;
  // phone?: string;

  @Column(type => Provider)
  providers: Provider[];

  @Column({ default: ['user'] })
  roles?: string[] = ['user'];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  modifiedAt?: Date;

  /* For reset password */
  // resetPasswordToken?: string;
  // resetPasswordExpires?: Date;

  // get primaryEmail(): string {
  //   if (this.emails.length) {
  //     return result(find(this.emails, email => email.isPrimary), 'address');
  //   }
  // }
}
