import { DefaultCreatedDtoOut } from '../../common/dto.out/default.201.dto.out';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Post has been created successfully';

export class PostCreatedDtoOut extends DefaultCreatedDtoOut {
  @ApiProperty({ default: message })
  message: string = message;
}
