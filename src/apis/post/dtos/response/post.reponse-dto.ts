import { UserResponseDto } from '@src/apis/user/dtos/response/user.response-dto';
import {
  BaseResponseDto,
  CreateBaseResponseDtoProps,
} from '@src/libs/api/dtos/response/base.response-dto';
import { AggregateID } from '@src/libs/ddd/entity.base';

export interface CreatePostResponseDtoProps extends CreateBaseResponseDtoProps {
  userId: AggregateID;

  title: string;
  body: string;

  user?: UserResponseDto;
}

export class PostResponseDto extends BaseResponseDto {
  readonly userId: string;

  readonly title: string;
  readonly body: string;

  readonly user?: UserResponseDto;

  constructor(create: CreatePostResponseDtoProps) {
    super(create);

    const { userId, title, body, user } = create;

    this.userId = userId.toString();

    this.body = body;
    this.title = title;

    if (user) {
      this.user = user;
    }
  }
}
