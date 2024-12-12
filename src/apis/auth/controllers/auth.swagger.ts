import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { AuthController } from '@src/apis/auth/controllers/auth.controller';
import { IdResponseDto } from '@src/libs/api/dtos/response/id.response-dto';
import { HttpConflictException } from '@src/libs/exceptions/client-errors/exceptions/http-conflict.exception';
import { USER_ERROR_CODE } from '@src/libs/exceptions/types/errors/user/user-error-code.constant';
import { CustomValidationError } from '@src/libs/types/custom-validation-errors.type';
import {
  ApiOperator,
  ApiOperationOptionsWithSummary,
} from '@src/libs/types/type';

export const ApiAuth: ApiOperator<keyof AuthController> = {
  SignUp: (
    apiOperationOptions: ApiOperationOptionsWithSummary,
  ): MethodDecorator => {
    return applyDecorators(
      ApiOperation({
        ...apiOperationOptions,
      }),
      ApiCreatedResponse({
        description: '정상적으로 회원가입 됨.',
        type: IdResponseDto,
      }),
      HttpConflictException.swaggerBuilder(
        HttpStatus.CONFLICT,
        [USER_ERROR_CODE.ALREADY_CREATED_USER],
        {
          description: '이미 가입된 유저입니다.',
          type: CustomValidationError,
        },
      ),
    );
  },
};
