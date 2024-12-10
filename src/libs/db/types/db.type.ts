import { Prisma } from '@prisma/client';
import {
  DynamicModelExtensionThis,
  InternalArgs,
} from '@prisma/client/runtime/library';

export type ModelNames = 'Post' | 'User';

export type Model<T extends ModelNames> = DynamicModelExtensionThis<
  Prisma.TypeMap<InternalArgs>,
  T,
  object,
  object
>;
