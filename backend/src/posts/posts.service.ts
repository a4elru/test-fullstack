import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDtoIn } from './dto.in/create-post.dto.in';
import { UpdatePostDtoIn } from './dto.in/update-post.dto.in';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async createPost(createPostDto: CreatePostDtoIn): Promise<InsertResult> {
    return await this.postsRepository.insert(createPostDto);
  }

  async findAllPosts(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async findOnePost(id: number): Promise<Post | null> {
    return await this.postsRepository.findOneBy({ id });
  }

  async updatePost(
    id: number,
    updatePostDto: UpdatePostDtoIn,
  ): Promise<UpdateResult> {
    return await this.postsRepository.update(id, updatePostDto);
  }

  async removePost(id: number): Promise<DeleteResult> {
    return await this.postsRepository.delete(id);
  }
}
