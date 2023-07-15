import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserExample } from '../../users/entities/user.entity';
import { LoginDtoIn } from './login.dto.in';

/**
 * @extends LoginDtoIn {@link LoginDtoIn}
 * @prop readonly **username**: *string*
 */
export class SignUpDtoIn extends LoginDtoIn {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: UserExample.username })
  readonly username: string;

  static getUniqueColumns(): string[] {
    const props = super.getUniqueColumns();
    return [...props, 'username'];
  }
}
