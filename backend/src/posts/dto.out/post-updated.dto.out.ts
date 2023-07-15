import { DefaultOKDtoOut } from '../../common/dto.out/default.200.dto.out';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Post has been successfully updated';

export class PostUpdatedDtoOut extends DefaultOKDtoOut {
  @ApiProperty({ default: message })
  message: string = message;
}
