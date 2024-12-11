import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces';
import { UserController } from '@src/apis/user/controllers/user.controller';
import { UserMapper } from '@src/apis/user/mappers/user.mapper';
import { UserRepository } from '@src/apis/user/repositories/user.repository';
import { USER_REPOSITORY_TOKEN } from '@src/apis/user/tokens/di.token';

const controllers = [UserController];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
];

const mappers: Provider[] = [UserMapper];

@Module({
  controllers: [...controllers],
  providers: [...mappers, ...repositories],
})
export class UserModule {}
