import { AggregateID } from '@libs/ddd/entity.base';
import { EventBus } from '@nestjs/cqrs';
import { Model, ModelNames } from '@src/libs/db/types/db.type';
import { AggregateRoot } from '@src/libs/ddd/aggregate-root.base';
import { Mapper } from '@src/libs/ddd/mapper.interface';
import { RepositoryPort } from '@src/libs/ddd/repository.port';
import { z } from 'zod';

export const baseSchema = z
  .object({
    id: z.bigint(),
    createdAt: z.preprocess((val: any) => new Date(val), z.date()),
    updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  })
  .strict();

export type BaseModel = z.TypeOf<typeof baseSchema>;

export abstract class BaseRepository<
  Aggregate extends AggregateRoot<any>,
  DbModel extends BaseModel,
> implements RepositoryPort<Aggregate>
{
  protected constructor(
    protected readonly model: Model<ModelNames>,
    protected readonly mapper: Mapper<Aggregate, DbModel>,
    protected readonly eventBus: EventBus,
  ) {}

  async findOneById(id: bigint): Promise<Aggregate | undefined> {
    const record = await this.model.findUnique({ where: { id } });

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
}
