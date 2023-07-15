import { DefaultOKDtoOut } from '../../common/dto.out/default.200.dto.out';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

const message = 'User data found successfully';

export class GetMeDtoOut extends DefaultOKDtoOut {
  @ApiProperty({ default: message })
  message: string = message;

  @ApiProperty({ type: User })
  result: User;

  constructor(user: User) {
    super();
    this.result = user;
  }
}
