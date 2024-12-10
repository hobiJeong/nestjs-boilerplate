import type { LoginCredential } from '@src/apis/user/domain/value-objects/login-credentials.value-object';
import type { UserRoleUnion } from '@src/apis/user/types/user.type';

export interface UserProps {
  nickname: string;
  loginCredential: LoginCredential;
  role: UserRoleUnion;
  deletedAt: Date | null;
}

export interface CreateUserProps {
  nickname: string;
  loginCredential: LoginCredential;
}
