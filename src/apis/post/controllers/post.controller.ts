import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePostCommand } from '@src/apis/post/commands/create-post/create-post.command';
import { ApiPost } from '@src/apis/post/controllers/post.swagger';
import { CreatePostRequestBodyDto } from '@src/apis/post/dtos/request/create-post.request-body-dto';
import { routesV1 } from '@src/configs/app.route';
import { GetUserId } from '@src/libs/api/decorators/get-user-id.decorator';
import { IdResponseDto } from '@src/libs/api/dtos/response/id.response-dto';
import { AggregateID } from '@src/libs/ddd/entity.base';

@Controller(routesV1.version)
export class PostController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiPost.Create({ summary: '게시글 생성 API' })
  @Post(routesV1.post.root)
  async create(
    @GetUserId() userId: bigint,
    @Body() createPostRequestBodyDto: CreatePostRequestBodyDto,
  ) {
    const command = new CreatePostCommand({
      userId,
      ...createPostRequestBodyDto,
    });

    const result = await this.commandBus.execute<
      CreatePostCommand,
      AggregateID
    >(command);

    return new IdResponseDto(result);
  }
}
