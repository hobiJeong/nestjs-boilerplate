import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { UserEntity } from '@src/apis/user/domain/user.entity';
import { UserMapper } from '@src/apis/user/mappers/user.mapper';
import { UserRepositoryPort } from '@src/apis/user/repositories/user.repository-port';
import { PrismaService } from '@src/libs/core/prisma/services/prisma.service';
import { AggregateID } from '@src/libs/ddd/entity.base';
import { HttpInternalServerErrorException } from '@src/libs/exceptions/server-errors/exceptions/http-internal-server-error.exception';
import { COMMON_ERROR_CODE } from '@src/libs/exceptions/types/errors/common/common-error-code.constant';
import { isNil } from '@src/libs/utils/util';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  private readonly user: Prisma.UserDelegate<DefaultArgs>;
  private readonly userCredential: Prisma.UserCredentialDelegate<DefaultArgs>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
    private readonly mapper: UserMapper,
  ) {
    this.user = prisma.user;
  }

  async findOneById(id: bigint): Promise<UserEntity | undefined> {
    const record = await this.user.findUnique({ where: { id } });

    return record ? this.mapper.toEntity(record) : undefined;
  }

  async findAll(): Promise<UserEntity[]> {
    const record = await this.user.findMany();

    return record.map(this.mapper.toEntity);
  }

  async delete(entity: UserEntity): Promise<AggregateID> {
    entity.validate();

    const result = await this.user.delete({ where: { id: entity.id } });

    await entity.publishEvents(this.eventBus);

    return result.id;
  }

  async create(entity: UserEntity): Promise<void> {
    const { userCredential, ...userRecords } =
      this.mapper.toPersistence(entity);

    if (isNil(userCredential)) {
      throw new HttpInternalServerErrorException({
        ctx: 'When a user is created, a UserCredential should be created as well',
        code: COMMON_ERROR_CODE.SERVER_ERROR,
      });
    }

    await this.user.create({
      data: {
        ...userRecords,
        userCredential: {
          create: userCredential,
        },
      },
    });

    await entity.publishEvents(this.eventBus);
  }

  async update(entity: UserEntity): Promise<UserEntity> {
    const { userCredential, ...userRecord } = this.mapper.toPersistence(entity);

    const updatedRecord = await this.user.update({
      where: { id: userRecord.id },
      data: userCredential
        ? { ...userRecord, userCredential: { update: userCredential } }
        : userRecord,
    });

    return this.mapper.toEntity(updatedRecord);
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    const existUser = await this.user.findFirst({
      where: {
        userCredential: {
          email,
        },
      },
    });

    return existUser ? this.mapper.toEntity(existUser) : undefined;
  }
}
