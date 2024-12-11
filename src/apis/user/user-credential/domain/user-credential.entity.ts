import {
  UserCredentialProps,
  CreateUserCredentialProps,
} from '@src/apis/user/user-credential/user-credential.entity-interface';
import { Entity } from '@src/libs/ddd/entity.base';

import { getTsid } from 'tsid-ts';

export class UserCredentialEntity extends Entity<UserCredentialProps> {
  static create(create: CreateUserCredentialProps): UserCredentialEntity {
    const id = getTsid().toBigInt();

    const { ...createProps } = create;

    const props: UserCredentialProps = {
      ...createProps,
    };

    const userCredential = new UserCredentialEntity({ id, props });

    return userCredential;
  }

  public validate(): void {}
}
