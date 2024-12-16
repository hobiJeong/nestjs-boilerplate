import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppJwtServicePort } from '@src/jwt/services/app-jwt.service-port';
import { JwtPayload } from '@src/jwt/types/app-jwt.interface';
import { HttpUnauthorizedException } from '@src/libs/exceptions/client-errors/exceptions/http-unauthorized.exception';
import { COMMON_ERROR_CODE } from '@src/libs/exceptions/types/errors/common/common-error-code.constant';

@Injectable()
export class AppJwtService implements AppJwtServicePort {
  constructor(private readonly jwtService: JwtService) {}
  generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(
      {
        payload,
      },
      {
        expiresIn: '1d',
      },
    );
  }

  verifyAccessToken(accessToken: string): JwtPayload {
    try {
      return this.jwtService.verify(accessToken);
    } catch {
      throw new HttpUnauthorizedException({
        code: COMMON_ERROR_CODE.INVALID_TOKEN,
      });
    }
  }
}
