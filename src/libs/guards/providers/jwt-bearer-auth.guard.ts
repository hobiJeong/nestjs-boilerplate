import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpUnauthorizedException } from '@src/libs/exceptions/client-errors/exceptions/http-unauthorized.exception';
import { COMMON_ERROR_CODE } from '@src/libs/exceptions/types/errors/common/common-error-code.constant';

@Injectable()
export class JwtBearerAuthGuard extends AuthGuard('jwt') {
  handleRequest<UserEntity>(err, user: UserEntity) {
    if (err || !user) {
      throw new HttpUnauthorizedException({
        code: COMMON_ERROR_CODE.INVALID_TOKEN,
      });
    }
    return user;
  }
}
