import { Module } from '@nestjs/common';
import { UserModule } from '@src/apis/user/user.module';
import { BasicTokenGuard } from '@src/libs/guards/providers/basic-auth.guard';
import { JwtBearerAuthGuard } from '@src/libs/guards/providers/jwt-bearer-auth.guard';
import { JwtBearerAuthStrategy } from '@src/libs/guards/providers/jwt-bearer-auth.strategy';

@Module({
  imports: [UserModule],
  providers: [JwtBearerAuthGuard, JwtBearerAuthStrategy, BasicTokenGuard],
  exports: [UserModule],
})
export class GuardModule {}
