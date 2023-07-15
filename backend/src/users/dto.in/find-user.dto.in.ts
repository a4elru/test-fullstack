import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDtoIn } from './create-user.dto.in';
import { UserExample } from '../entities/user.entity';

/**
 * @extends CreateUserDtoIn {@link CreateUserDtoIn PartialType(CreateUserDtoIn)}
 * @property readonly **id**: *number*
 */
export class findOneUserDtoIn extends PartialType(CreateUserDtoIn) {
  @ApiProperty({ example: UserExample.id })
  readonly id?: number;
}
