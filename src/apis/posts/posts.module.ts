import { Module } from '@nestjs/common';
import { PostsController } from '@src/apis/posts/controllers/posts.controller';

@Module({
  controllers: [PostsController],
})
export class PostsModule {}
