import { Module } from '@nestjs/common';
import { UserController } from '@src/apis/user/controllers/user.controller';
import { UserService } from '@src/apis/user/services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
