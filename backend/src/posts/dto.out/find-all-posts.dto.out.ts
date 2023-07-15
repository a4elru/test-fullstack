import { DefaultOKDtoOut } from '../../common/dto.out/default.200.dto.out';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';

const message = 'All posts data found successfully';

export class FindAllPostsDtoOut extends DefaultOKDtoOut {
  @ApiProperty({ default: message })
  message: string = message;

  @ApiProperty({ type: [Post] })
  result: Post[];

  constructor(posts: Post[]) {
    super();
    this.result = posts;
  }
}
