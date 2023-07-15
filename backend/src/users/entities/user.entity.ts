import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

export const UserExample = {
  id: 1,
  login: 'LOGIN',
  password: 'PASSWORD', // hashed in db
  username: 'USERNAME',
};

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: UserExample.id })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: UserExample.login })
  login: string;

  @Column({ select: false })
  @ApiHideProperty()
  password: string;

  @Column({ unique: true })
  @ApiProperty({ example: UserExample.username })
  username: string;
}
