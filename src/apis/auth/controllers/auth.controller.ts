import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiAuth } from '@src/apis/auth/controllers/auth.swagger';
import { SignUpRequestBodyDto } from '@src/apis/auth/dtos/request/sign-up.request-dto';
import { CreateUserCommand } from '@src/apis/user/commands/create-user/create-user.command';
import { UserLoginType } from '@src/apis/user/types/user.constant';
import { routesV1 } from '@src/configs/app.route';
import { IdResponseDto } from '@src/libs/api/dtos/response/id.response-dto';
import { AggregateID } from '@src/libs/ddd/entity.base';

@Controller(routesV1.version)
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiAuth.SignUp({ summary: '회원가입 API' })
  @Post(routesV1.auth.signUp)
  async signUp(
    @Body() signUpRequestBodyDto: SignUpRequestBodyDto,
  ): Promise<IdResponseDto> {
    const command = new CreateUserCommand({
      ...signUpRequestBodyDto,
      loginType: UserLoginType.EMAIL,
    });

    const result = await this.commandBus.execute<
      CreateUserCommand,
      AggregateID
    >(command);

    return new IdResponseDto(result);
  }
}
