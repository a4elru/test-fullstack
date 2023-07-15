import { DefaultOKDtoOut } from '../../common/dto.out/default.200.dto.out';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';

const message = 'Post found successfully';

export class FindOnePostDtoOut extends DefaultOKDtoOut {
  @ApiProperty({ default: message })
  message: string = message;

  @ApiProperty({ type: Post })
  result: Post;

  constructor(post: Post) {
    super();
    this.result = post;
  }
}
