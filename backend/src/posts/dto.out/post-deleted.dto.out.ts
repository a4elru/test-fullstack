import { DefaultOKDtoOut } from '../../common/dto.out/default.200.dto.out';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Post deleted successfully';

export class PostDeletedDtoOut extends DefaultOKDtoOut {
  @ApiProperty({ default: message })
  message: string = message;
}
