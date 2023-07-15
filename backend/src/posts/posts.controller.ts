import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';

import { CreatePostDtoIn } from './dto.in/create-post.dto.in';
import { UpdatePostDtoIn } from './dto.in/update-post.dto.in';
import { StringIdDtoIn } from '../common/dto.in/string-id.dto.in';

import { PostCreatedDtoOut } from './dto.out/post-created.dto.out';
import { FindAllPostsDtoOut } from './dto.out/find-all-posts.dto.out';
import { FindOnePostDtoOut } from './dto.out/find-one-post.dto.out';
import { PostUpdatedDtoOut } from './dto.out/post-updated.dto.out';
import { PostDeletedDtoOut } from './dto.out/post-deleted.dto.out';
import { DefaultUnauthorizedDtoOut } from '../common/dto.out/default.401.dto.out';
import {
  DefaultForbiddenDtoOut,
  Forbidden,
} from '../common/dto.out/default.403.dto.out';
import {
  DefaultNotFoundDtoOut,
  NotFound,
} from '../common/dto.out/default.404.dto.out';

import { Public } from '../auth/public.decorator';
import { RequestWithUser } from 'src/auth/request-with-user.interface';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PostCreatedDtoOut })
  @ApiUnauthorizedResponse({ type: DefaultUnauthorizedDtoOut })
  async create(
    @Body() createPostDto: CreatePostDtoIn,
    @Req() req: RequestWithUser,
  ) {
    const createPostDtoNext: any = { ...createPostDto };
    createPostDtoNext.creatorUserId = req.user.sub;
    const insertResult = await this.postsService.createPost(createPostDtoNext);
    return new PostCreatedDtoOut(insertResult);
  }

  @Public()
  @Get()
  @ApiOkResponse({ type: FindAllPostsDtoOut })
  async findAll() {
    const posts = await this.postsService.findAllPosts();
    return new FindAllPostsDtoOut(posts);
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ type: FindOnePostDtoOut })
  @ApiNotFoundResponse({ type: DefaultNotFoundDtoOut })
  async findOne(@Param() postIdDto: StringIdDtoIn) {
    const post = await this.postsService.findOnePost(+postIdDto.id);
    if (post) {
      return new FindOnePostDtoOut(post);
    }
    throw new HttpException(...NotFound());
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostUpdatedDtoOut })
  @ApiUnauthorizedResponse({ type: DefaultUnauthorizedDtoOut })
  @ApiForbiddenResponse({ type: DefaultForbiddenDtoOut })
  @ApiNotFoundResponse({ type: DefaultNotFoundDtoOut })
  async update(
    @Param() postIdDto: StringIdDtoIn,
    @Body() updatePostDto: UpdatePostDtoIn,
    @Req() req: RequestWithUser,
  ) {
    const existsPost = await this.postsService.findOnePost(+postIdDto.id);
    if (!existsPost) {
      throw new HttpException(...NotFound());
    }
    if (existsPost.creatorUserId !== req.user.sub) {
      throw new HttpException(...Forbidden());
    }
    const updateResult = await this.postsService.updatePost(
      +postIdDto.id,
      updatePostDto,
    );
    if ((updateResult.affected || 0) > 0) {
      return new PostUpdatedDtoOut();
    }
    throw new HttpException(...NotFound()); // 500?
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostDeletedDtoOut })
  @ApiUnauthorizedResponse({ type: DefaultUnauthorizedDtoOut })
  @ApiForbiddenResponse({ type: DefaultForbiddenDtoOut })
  @ApiNotFoundResponse({ type: DefaultNotFoundDtoOut })
  async remove(@Param() postIdDto: StringIdDtoIn, @Req() req: RequestWithUser) {
    const existsPost = await this.postsService.findOnePost(+postIdDto.id);
    if (!existsPost) {
      throw new HttpException(...NotFound());
    }
    if (existsPost.creatorUserId !== req.user.sub) {
      throw new HttpException(...Forbidden());
    }
    const deleteResult = await this.postsService.removePost(+postIdDto.id);
    if ((deleteResult.affected || 0) > 0) {
      return new PostDeletedDtoOut();
    }
    throw new HttpException(...NotFound()); // 500?
  }
}
