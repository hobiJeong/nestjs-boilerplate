import { Module } from '@nestjs/common';
import { AuthModule } from '@src/apis/auth/auth.module';
import { PostsModule } from '@src/apis/posts/posts.module';
import { UserModule } from '@src/apis/user/user.module';

@Module({
  imports: [AuthModule, PostsModule, UserModule],
})
export class ApisModule {}
