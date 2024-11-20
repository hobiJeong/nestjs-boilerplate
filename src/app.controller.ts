import { Controller, Get } from '@nestjs/common';
import { HttpBadRequestException } from '@src/libs/exceptions/client-errors/exceptions/http-bad-request.exception';
import { ERROR_CODE } from '@src/libs/exceptions/types/errors/error-code.constant';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    throw new HttpBadRequestException({
      code: ERROR_CODE.INVALID_REQUEST_PARAMETER,
    });
  }
}
