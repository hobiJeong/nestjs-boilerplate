import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '@src/apis/auth/controllers/auth.swagger';
import { SignUpRequestBodyDto } from '@src/apis/auth/dtos/request/sign-up.request-dto';
import { JwtResponseDto } from '@src/apis/auth/dtos/response/jwt.response-dto';
import { CreateUserCommand } from '@src/apis/user/commands/create-user/create-user.command';
import { UserLoginType } from '@src/apis/user/types/user.constant';
import { routesV1 } from '@src/configs/app.route';

@ApiTags('Auth')
@Controller(routesV1.version)
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiAuth.SignUp({ summary: '회원가입 API' })
  @Post(routesV1.auth.signUp)
  async signUp(
    @Body() signUpRequestBodyDto: SignUpRequestBodyDto,
  ): Promise<JwtResponseDto> {
    const command = new CreateUserCommand({
      ...signUpRequestBodyDto,
      loginType: UserLoginType.EMAIL,
    });

    const result = await this.commandBus.execute<CreateUserCommand, string>(
      command,
    );

    return new JwtResponseDto({ accessToken: result });
  }
}
