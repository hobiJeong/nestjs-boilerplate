import { LoginCredential } from '@src/apis/user/user-credential/domain/value-objects/login-credentials.value-object';
import { AggregateID } from '@src/libs/ddd/entity.base';

export interface UserCredentialProps {
  userId: AggregateID;
  loginCredential: LoginCredential;
}

export interface CreateUserCredentialProps {
  userId: AggregateID;
  loginCredential: LoginCredential;
}
