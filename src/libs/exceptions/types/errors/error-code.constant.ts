import { COMMON_ERROR_CODE } from '@src/libs/exceptions/types/errors/common/common-error-code.constant';

export const ERROR_CODE = {
  // 0 ~ 999
  ...COMMON_ERROR_CODE,
} as const;
