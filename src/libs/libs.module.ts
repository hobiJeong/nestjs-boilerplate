import { Module } from '@nestjs/common';
import { CoreModule } from '@src/libs/core/core.module';
import { ExceptionsModule } from '@src/libs/exceptions/exceptions.module';
import { InterceptorsModule } from '@src/libs/interceptors/interceptors.module';

@Module({
  imports: [CoreModule, ExceptionsModule, InterceptorsModule],
})
export class LibsModule {}
