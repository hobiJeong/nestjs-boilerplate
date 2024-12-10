import { Module } from '@nestjs/common';
import { UsersController } from '@src/apis/users/controllers/users.controller';

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
