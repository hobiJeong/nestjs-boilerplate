import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { UserEntity } from '@src/apis/user/domain/user.entity';
import { UserMapper } from '@src/apis/user/mappers/user.mapper';
import { UserRepositoryPort } from '@src/apis/user/repositories/user.repository-port';
import { UserLoginTypeUnion } from '@src/apis/user/types/user.type';
import { PrismaService } from '@src/libs/core/prisma/services/prisma.service';
import { AggregateID } from '@src/libs/ddd/entity.base';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  private readonly user: Prisma.UserDelegate<DefaultArgs>;

  constructor(
    private readonly txHost: TransactionHost<
      TransactionalAdapterPrisma<PrismaService>
    >,
    private readonly eventBus: EventBus,
    private readonly mapper: UserMapper,
  ) {
    this.user = txHost.tx.user;
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
    const record = this.mapper.toPersistence(entity);

    await this.user.create({
      data: record,
    });

    await entity.publishEvents(this.eventBus);
  }

  async update(entity: UserEntity): Promise<UserEntity> {
    const record = this.mapper.toPersistence(entity);

    const updatedRecord = await this.user.update({
      where: { id: record.id },
      data: record,
    });

    return this.mapper.toEntity(updatedRecord);
  }

  async findOneByEmailAndLoginType(
    email: string,
    loginType: UserLoginTypeUnion,
  ): Promise<UserEntity | undefined> {
    const existUser = await this.user.findFirst({
      where: {
        email,
        loginType,
      },
    });

    return existUser ? this.mapper.toEntity(existUser) : undefined;
  }
}
