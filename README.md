# NestJS boilerplate (DDD + Hexagonal + Prisma)

## DB setup

1. Run `docker-compose up`

## Create migration

1. Modify schema.prisma
2. Run `npx prisma migrate dev --create-only --preview-feature` and check changes
3. Run `npx prisma migrate deploy --preview-feature` for deploy
4. Apply changes by `npx prisma generate`
