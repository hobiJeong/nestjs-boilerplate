import { Module } from '@nestjs/common';
import { PostsModule } from '@src/apis/posts/posts.module';
import { UsersModule } from '@src/apis/users/users.module';

@Module({
  imports: [PostsModule, UsersModule],
})
export class ApisModule {}
