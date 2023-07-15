import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { CreateUserDtoIn } from './dto.in/create-user.dto.in';
import { findOneUserDtoIn } from './dto.in/find-user.dto.in';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserDtoIn,
  ): Promise<InsertResult | null> {
    try {
      return await this.usersRepository.insert(createUserDto);
    } catch (error) {
      if (error.code === '23505') {
        return null; // unique constraint error
      }
      throw error;
    }
  }

  async findOneUser(findOptions: findOneUserDtoIn): Promise<User | null> {
    return await this.usersRepository.findOneBy(findOptions);
  }

  async findPasswordForOneUser(
    findOptions: findOneUserDtoIn,
  ): Promise<Pick<User, 'id' | 'password'> | null> {
    return await this.usersRepository.findOne({
      select: ['id', 'password'],
      where: findOptions,
    });
  }

  async removeUser(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
