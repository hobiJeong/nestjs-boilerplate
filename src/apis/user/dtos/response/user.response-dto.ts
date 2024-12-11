import {
  UserLoginTypeUnion,
  UserRoleUnion,
} from '@src/apis/user/types/user.type';
import {
  BaseResponseDto,
  CreateBaseResponseDtoProps,
} from '@src/libs/api/dtos/response/base.response-dto';

export interface CreateUserResponseDtoProps extends CreateBaseResponseDtoProps {
  readonly name: string;
  readonly email: string;
  readonly loginType: UserLoginTypeUnion;
  readonly role: UserRoleUnion;
}

export class UserResponseDto extends BaseResponseDto {
  readonly name: string;
  readonly email: string;
  readonly loginType: UserLoginTypeUnion;
  readonly role: UserRoleUnion;

  constructor(create: CreateUserResponseDtoProps) {
    super(create);

    const { name, role, email, loginType } = create;

    this.name = name;
    this.email = email;
    this.loginType = loginType;
    this.role = role;
  }
}
