import { RepositoryPort } from '@libs/ddd/repository.port';
import { UserEntity } from '@src/apis/user/domain/user.entity';

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {}
