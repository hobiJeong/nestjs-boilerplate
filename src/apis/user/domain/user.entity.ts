import { AggregateRoot } from '@libs/ddd/aggregate-root.base';
import { UserCreatedDomainEvent } from '@src/apis/user/domain/events/user-created.event';
import type {
  CreateUserProps,
  UserProps,
} from '@src/apis/user/domain/user.entity-interface';
import { UserRole } from '@src/apis/user/types/user.const';
import { UserCredentialEntity } from '@src/apis/user/user-credential/domain/user-credential.entity';

import { getTsid } from 'tsid-ts';

export class UserEntity extends AggregateRoot<UserProps> {
  static create(create: CreateUserProps): UserEntity {
    const id = getTsid().toBigInt();

    const userCredential = UserCredentialEntity.create({
      userId: id,
      ...create,
    });

    const props: UserProps = {
      ...create,
      role: UserRole.USER,
      userCredential,
      deletedAt: null,
    };

    const user = new UserEntity({ id, props });

    user.addEvent(
      new UserCreatedDomainEvent({
        aggregateId: id,
        ...userCredential.getProps().loginCredential.unpack(),
      }),
    );

    return user;
  }

  public validate(): void {}
}
