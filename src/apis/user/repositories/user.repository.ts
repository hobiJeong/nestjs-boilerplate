import { BaseRepository } from '@libs/db/base.repository';
import { Injectable } from '@nestjs/common';
import { PostEntity } from '@modules/posts/domain/post.entity';
import { EventBus } from '@nestjs/cqrs';
import { PostMapper } from '@modules/posts/mappers/post.mapper';
import { AggregateID } from '@libs/ddd/entity.base';
import { UserRepositoryPort } from '@src/apis/users/repositories copy/users.repository-port';
import { Model } from '@src/libs/db/types/db.type';
import { PrismaService } from '@src/libs/core/prisma/services/prisma.service';

import { AggregateID } from '@libs/ddd/entity.base';
import { EventBus } from '@nestjs/cqrs';
import { Model } from '@src/libs/db/types/db.type';
import { AggregateRoot } from '@src/libs/ddd/aggregate-root.base';
import { Mapper } from '@src/libs/ddd/mapper.interface';
import { RepositoryPort } from '@src/libs/ddd/repository.port';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export const baseSchema = z
  .object({
    id: z.bigint(),
    createdAt: z.preprocess((val: any) => new Date(val), z.date()),
    updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  })
  .strict();

export type BaseModel = z.TypeOf<typeof baseSchema>;

@Injectable()
export class UserRepository implements UserRepositoryPort {
  private readonly user: Prisma.UserDelegate<DefaultArgs>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
    private readonly usersMapper: UserMapper,
  ) {
    this.user = prisma.user;
  }

  async findOneById(id: bigint): Promise<Aggregate | undefined> {
    const record = await this.model.;

    return record ? this.mapper.toEntity(record) : undefined;
  }

  async findAll(): Promise<Aggregate[]> {
    const record = await this.model.findMany();

    return record.map(this.mapper.toEntity);
  }

  async delete(entity: Aggregate): Promise<AggregateID> {
    entity.validate();

    const result = await this.model.delete({ where: { id: entity.id } });

    await entity.publishEvents(this.eventBus);

    return result.id;
  }

  async insert(entity: Aggregate | Aggregate[]): Promise<void> {
    const entities = Array.isArray(entity) ? entity : [entity];

    const records = entities.map(this.mapper.toPersistence);

    await this.model.createMany({
      data: records.map((record) => record) as any,
    });

    await Promise.all(
      entities.map(async (entity) => await entity.publishEvents(this.eventBus)),
    );
  }

  async update(entity: Aggregate) {
    const record = this.mapper.toPersistence(entity);

    const updatedRecord = this.model.update({
      where: { id: record.id },
      data: { ...record },
    });

    return this.mapper.toEntity(updatedRecord);
  }

  async findOneByIdAndUserId(
    id: AggregateID,
    userId: AggregateID,
  ): Promise<PostEntity | undefined> {
    const post = await this.postModel.findUnique({
      where: {
        id,
        userId,
      },
    });

    return post ? this.mapper.toEntity(post) : undefined;
  }
}
