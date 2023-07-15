import { PartialType } from '@nestjs/swagger';
import { CreatePostDtoIn } from './create-post.dto.in';

export class UpdatePostDtoIn extends PartialType(CreatePostDtoIn) {}
