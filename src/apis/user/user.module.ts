import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces';
import { CreateUserCommandHandler } from '@src/apis/user/commands/create-user/create-user.command-handler';
import { UserController } from '@src/apis/user/controllers/user.controller';
import { UserMapper } from '@src/apis/user/mappers/user.mapper';
import { FindOneUserQueryHandler } from '@src/apis/user/queries/find-one-user/find-one-user.query';
import { UserRepository } from '@src/apis/user/repositories/user.repository';
import { USER_REPOSITORY_TOKEN } from '@src/apis/user/tokens/di.token';

const controllers = [UserController];

const commandHandlers: Provider[] = [CreateUserCommandHandler];

const queryHandlers: Provider[] = [FindOneUserQueryHandler];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
];

const mappers: Provider[] = [UserMapper];

@Module({
  controllers: [...controllers],
  providers: [
    ...mappers,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class UserModule {}
