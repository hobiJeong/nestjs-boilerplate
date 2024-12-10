import { Module } from '@nestjs/common';
import { AuthModule } from '@src/apis/auth/auth.module';
import { PostsModule } from '@src/apis/posts/posts.module';
import { UsersModule } from '@src/apis/users/users.module';

@Module({
  imports: [AuthModule, PostsModule, UsersModule],
})
export class ApisModule {}
