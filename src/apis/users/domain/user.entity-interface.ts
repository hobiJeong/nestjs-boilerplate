import type { LoginCredential } from '@src/apis/users/domain/value-objects/login-credentials.value-object';
import type { UserRoleUnion } from '@src/apis/users/types/user.type';

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
