import { Injectable } from '@nestjs/common';
import {
  USER_PASSWORD_REGEXP,
  UserLoginType,
} from '@src/apis/user/types/user.const';
import { UserCredentialEntity } from '@src/apis/user/user-credential/domain/user-credential.entity';
import { LoginCredential } from '@src/apis/user/user-credential/domain/value-objects/login-credentials.value-object';
import { UserCredentialResponseDto } from '@src/apis/user/user-credential/dtos/user-credential.response-dto';
import { baseSchema } from '@src/libs/db/base.repository';
import { Mapper } from '@src/libs/ddd/mapper.interface';
import { z } from 'zod';

export const userCredentialSchema = baseSchema.extend({
  userId: z.bigint(),
  email: z.string().email(),
  password: z.string().regex(USER_PASSWORD_REGEXP),
  loginType: z.enum([UserLoginType.EMAIL]),
});

export type UserCredentialModel = z.TypeOf<typeof userCredentialSchema>;

@Injectable()
export class UserCredentialMapper
  implements
    Mapper<
      UserCredentialEntity,
      UserCredentialModel,
      UserCredentialResponseDto
    >
{
  toEntity(record: UserCredentialModel): UserCredentialEntity {
    return new UserCredentialEntity({
      id: record.id,
      props: {
        userId: record.userId,
        loginCredential: new LoginCredential({
          email: record.email,
          password: record.password,
          loginType: record.loginType,
        }),
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  toPersistence(entity: UserCredentialEntity): UserCredentialModel {
    const props = entity.getProps();

    const record: UserCredentialModel = {
      id: props.id,
      userId: props.userId,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      ...props.loginCredential.unpack(),
    };

    return userCredentialSchema.parse(record);
  }

  toResponseDto(entity: UserCredentialEntity): UserCredentialResponseDto {
    const props = entity.getProps();

    return new UserCredentialResponseDto({
      ...props,
      ...props.loginCredential.unpack(),
    });
  }
}
