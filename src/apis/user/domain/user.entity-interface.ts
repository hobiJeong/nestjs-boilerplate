import type { UserRoleUnion } from '@src/apis/user/types/user.type';
import { UserCredentialEntity } from '@src/apis/user/user-credential/domain/user-credential.entity';
import { LoginCredential } from '@src/apis/user/user-credential/domain/value-objects/login-credentials.value-object';

export interface UserProps {
  name: string;
  role: UserRoleUnion;
  deletedAt: Date | null;

  userCredential?: UserCredentialEntity;
}

export interface CreateUserProps {
  name: string;
  loginCredential: LoginCredential;
}
