import { AggregateRoot } from '@libs/ddd/aggregate-root.base';
import { UserCreatedDomainEvent } from '@src/apis/user/domain/events/user-created.event';
import type {
  CreateUserProps,
  UserProps,
} from '@src/apis/user/domain/user.entity-interface';
import { UserRole } from '@src/apis/user/types/user.const';

import { getTsid } from 'tsid-ts';

export class UserEntity extends AggregateRoot<UserProps> {
  static create(create: CreateUserProps): UserEntity {
    const id = getTsid().toBigInt();

    const props: UserProps = {
      ...create,
      role: UserRole.USER,
      deletedAt: null,
    };

    const user = new UserEntity({ id, props });

    user.addEvent(
      new UserCreatedDomainEvent({
        aggregateId: id,
        ...props.loginCredential.unpack(),
      }),
    );

    return user;
  }

  public validate(): void {}
}
