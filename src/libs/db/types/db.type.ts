import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export type Model =
  | Prisma.UserDelegate<DefaultArgs>
  | Prisma.PostDelegate<DefaultArgs>;
