import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export const PostExample = {
  id: 1,
  creatorUserId: 1,
  title: 'The Title',
  description: 'The description',
};

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: PostExample.id })
  id: number;

  // creatorUserId + creatorUserIdId ?
  @Column({ update: false })
  @ManyToOne(() => User)
  @ApiProperty({ example: PostExample.creatorUserId })
  creatorUserId: number;

  @Column()
  @ApiProperty({ example: PostExample.title })
  title: string;

  @Column()
  @ApiProperty({ example: PostExample.description })
  description: string;
}
