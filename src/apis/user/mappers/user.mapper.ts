import { Mapper } from '@libs/ddd/mapper.interface';
import { Injectable } from '@nestjs/common';
import { baseSchema } from '@libs/db/base.repository';
import { z } from 'zod';
import { UserRole } from '@src/apis/user/types/user.const';
import { UserEntity } from '@src/apis/user/domain/user.entity';
import { UserProps } from '@src/apis/user/domain/user.entity-interface';
import { CreateEntityProps } from '@src/libs/ddd/entity.base';
import { isNil } from '@src/libs/utils/util';
import {
  UserCredentialMapper,
  userCredentialSchema,
} from '@src/apis/user/user-credential/mappers/user-credential.mapper';
import { UserResponseDto } from '@src/apis/user/dto/responses/user.response-dto';
import { HttpInternalServerErrorException } from '@src/libs/exceptions/server-errors/exceptions/http-internal-server-error.exception';
import { COMMON_ERROR_CODE } from '@src/libs/exceptions/types/errors/common/common-error-code.constant';

const userSchema = baseSchema.extend({
  name: z.string().min(1).max(20),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  deletedAt: z.preprocess(
    (val: any) => (val === null ? null : new Date(val)),
    z.nullable(z.date()),
  ),

  userCredential: z.optional(userCredentialSchema),
});

export type UserModel = z.TypeOf<typeof userSchema>;

@Injectable()
export class UserMapper
  implements Mapper<UserEntity, UserModel, UserResponseDto>
{
  constructor(private readonly userCredentialMapper: UserCredentialMapper) {}

  toEntity(record: UserModel): UserEntity {
    const userProps: CreateEntityProps<UserProps> = {
      id: record.id,
      props: {
        name: record.name,
        role: record.role,
        deletedAt: record.deletedAt,
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };

    if (!isNil(record.userCredential)) {
      userProps.props.userCredential = this.userCredentialMapper.toEntity(
        record.userCredential,
      );
    }

    return new UserEntity(userProps);
  }

  toPersistence(entity: UserEntity): UserModel {
    const props = entity.getProps();

    const record: UserModel = {
      id: props.id,
      name: props.name,
      role: props.role,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    };

    if (!isNil(props.userCredential)) {
      const userCredentialProps = props.userCredential.getProps();

      record.userCredential = {
        id: userCredentialProps.id,
        userId: userCredentialProps.userId,
        createdAt: userCredentialProps.createdAt,
        updatedAt: userCredentialProps.updatedAt,
        ...userCredentialProps.loginCredential.unpack(),
      };
    }

    return userSchema.parse(record);
  }

  toResponseDto(entity: UserEntity): UserResponseDto {
    const props = entity.getProps();

    if (isNil(props.userCredential)) {
      throw new HttpInternalServerErrorException({
        code: COMMON_ERROR_CODE.SERVER_ERROR,
        ctx: 'When serializing to UserResponseDto, the userCredential must exist.',
      });
    }

    const userCredentialResponseDto = this.userCredentialMapper.toResponseDto(
      props.userCredential,
    );

    return new UserResponseDto({
      ...props,
      userCredential: userCredentialResponseDto,
    });
  }
}
