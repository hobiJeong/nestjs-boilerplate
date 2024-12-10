import { Module } from '@nestjs/common';
import { AuthController } from '@src/apis/auth/controllers/auth.controller';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
