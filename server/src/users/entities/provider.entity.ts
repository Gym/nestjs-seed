import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export class Provider {
  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  id: string;

  @Column()
  profile: any;

  @Column()
  accessToken?: string;

  @Column()
  refreshToken?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  modifiedAt?: Date;
}
