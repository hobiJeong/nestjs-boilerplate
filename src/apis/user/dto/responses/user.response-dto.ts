import { UserRoleUnion } from '@src/apis/user/types/user.type';
import { UserCredentialResponseDto } from '@src/apis/user/user-credential/dtos/user-credential.response-dto';
import {
  BaseResponseDto,
  CreateBaseResponseDtoProps,
} from '@src/libs/api/dtos/response/base.response-dto';

export interface CreateUserResponseDtoProps extends CreateBaseResponseDtoProps {
  readonly name: string;
  readonly role: UserRoleUnion;

  readonly userCredential: UserCredentialResponseDto;
}

export class UserResponseDto extends BaseResponseDto {
  readonly name: string;
  readonly role: UserRoleUnion;

  userCredential: UserCredentialResponseDto;

  constructor(create: CreateUserResponseDtoProps) {
    super(create);

    const { name, role, userCredential } = create;

    this.name = name;
    this.role = role;

    this.userCredential = userCredential;
  }
}
