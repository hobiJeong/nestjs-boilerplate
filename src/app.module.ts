import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BootstrapService } from '@src/bootstrap.service';
import { LibsModule } from '@src/libs/libs.module';

@Module({
  imports: [LibsModule],
  controllers: [AppController],
  providers: [BootstrapService],
})
export class AppModule {}
