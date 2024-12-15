import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleOptionsFactory } from '@src/jwt/jwt-module-options.factory';
import { AppJwtService } from '@src/jwt/services/app-jwt.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtModuleOptionsFactory,
    }),
  ],
  providers: [AppJwtService],
})
export class AppJwtModule {}
