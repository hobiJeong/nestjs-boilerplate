import { UserLoginTypeUnion } from '@src/apis/user/types/user.type';
import {
  BaseResponseDto,
  CreateBaseResponseDtoProps,
} from '@src/libs/api/dtos/response/base.response-dto';
import { AggregateID } from '@src/libs/ddd/entity.base';

export interface CreateUserCredentialResponseDtoProps
  extends CreateBaseResponseDtoProps {
  readonly userId: AggregateID;

  readonly email: string;
  readonly loginType: UserLoginTypeUnion;
}

export class UserCredentialResponseDto extends BaseResponseDto {
  readonly userId: string;

  readonly email: string;
  readonly loginType: UserLoginTypeUnion;

  constructor(create: CreateUserCredentialResponseDtoProps) {
    super(create);

    const { userId, email, loginType } = create;

    this.userId = userId.toString();
    this.email = email;
    this.loginType = loginType;
  }
}
