import { Body, Controller, Post } from '@nestjs/common';
import { ApiAuth } from '@src/apis/auth/controllers/auth.swagger';
import { SignUpRequestBodyDto } from '@src/apis/auth/dtos/request/sign-up.request-dto';
import { routesV1 } from '@src/configs/app.route';

@Controller(routesV1.version)
export class AuthController {
  @ApiAuth.SignUp({ summary: '회원가입 API' })
  @Post(routesV1.auth.signUp)
  signUp(@Body() signUpRequestBodyDto: SignUpRequestBodyDto) {}
}
