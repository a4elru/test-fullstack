import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserExample } from '../entities/user.entity';

/**
 * @property readonly **login**: *string*
 * @property readonly **password**: *string*
 * @property readonly **username**: *string*
 */
export class CreateUserDtoIn {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: UserExample.login })
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: UserExample.password })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: UserExample.username })
  readonly username: string;
}
