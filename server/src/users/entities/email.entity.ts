import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export class Email {
  @Column()
  @IsNotEmpty()
  address: string;

  @Column()
  isPrimary: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  modifiedAt?: Date;

  /* For email validation */
  @Column()
  token?: string;

  @Column()
  confirmedAt?: Date;
}
