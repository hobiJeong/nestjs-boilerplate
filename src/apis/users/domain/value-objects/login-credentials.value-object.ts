import { Guard } from '@libs/guard';
import {
  USER_EMAIL_REGEXP,
  USER_PASSWORD_REGEXP,
  UserRole,
} from '@src/apis/users/types/user.const';
import type { UserLoginTypeUnion } from '@src/apis/users/types/user.type';
import { ValueObject } from '@src/libs/ddd/value-object.base';
import { HttpInternalServerErrorException } from '@src/libs/exceptions/server-errors/exceptions/http-internal-server-error.exception';
import { COMMON_ERROR_CODE } from '@src/libs/exceptions/types/errors/common/common-error-code.constant';

export interface LoginCredentialProps {
  email: string;
  password: string;
  loginType: UserLoginTypeUnion;
}

export class LoginCredential extends ValueObject<LoginCredentialProps> {
  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get loginType(): string {
    return this.props.loginType;
  }

  protected validate(props: LoginCredentialProps): void {
    if (!Guard.isMatch(props.email, USER_EMAIL_REGEXP)) {
      throw new HttpInternalServerErrorException({
        code: COMMON_ERROR_CODE.SERVER_ERROR,
        ctx: 'Not in email format',
      });
    }
    if (!Guard.isMatch(props.password, USER_PASSWORD_REGEXP)) {
      throw new HttpInternalServerErrorException({
        code: COMMON_ERROR_CODE.SERVER_ERROR,
        ctx: 'The password must be at least 8 and no more than 15 characters long, with at least one alphabetic character, a number, and a special character.',
      });
    }
    if (!Guard.isIn(props.loginType, Object.values(UserRole))) {
      throw new HttpInternalServerErrorException({
        code: COMMON_ERROR_CODE.SERVER_ERROR,
        ctx: `loginType must be ${Object.values(UserRole).join(', ')} only`,
      });
    }
  }
}
