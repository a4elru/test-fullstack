import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostExample } from '../entities/post.entity';

export class CreatePostDtoIn {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: PostExample.title })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: PostExample.description })
  description: string;
}
