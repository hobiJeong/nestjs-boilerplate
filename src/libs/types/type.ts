import { ApiOperationOptions } from '@nestjs/swagger';

export type ApiOperationOptionsWithSummary = Required<
  Pick<ApiOperationOptions, 'summary'>
> &
  ApiOperationOptions;

export type ApiOperator<M extends string> = {
  [key in Capitalize<M>]: (
    apiOperationOptions: ApiOperationOptionsWithSummary,
  ) => MethodDecorator;
};

export type ValueOf<T extends Record<string, any>> = T[keyof T];

export type ErrorMessage<T extends Record<string, number>> = Required<{
  [key in T[keyof T]]: string;
}>;
