import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';
import { User } from './users/entities/user.entity';
import { pgConfig } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [Post, User],
      type: 'postgres',
      synchronize: true,
      host: pgConfig.host,
      port: pgConfig.port,
      username: pgConfig.username,
      password: pgConfig.password,
      database: pgConfig.database,
    }),
  ],
})
export class DBRootModule {}
