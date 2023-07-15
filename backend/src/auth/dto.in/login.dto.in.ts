import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserExample } from '../../users/entities/user.entity';

/**
 * @prop readonly **login**: *string*
 * @prop **password**: *string*
 */
export class LoginDtoIn {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: UserExample.login })
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: UserExample.password })
  password: string;

  static getUniqueColumns(): string[] {
    return ['login'];
  }
}
