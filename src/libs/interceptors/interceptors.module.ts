import { Module } from '@nestjs/common';
import { PaginationInterceptorModule } from '@src/libs/interceptors/pagination/pagination-interceptor.module';

@Module({
  imports: [PaginationInterceptorModule],
})
export class InterceptorsModule {}
