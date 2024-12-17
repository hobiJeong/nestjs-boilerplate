import { Module } from '@nestjs/common';
import { PostController } from '@src/apis/post/controllers/post.controller';

@Module({
  controllers: [PostController],
})
export class PostModule {}
