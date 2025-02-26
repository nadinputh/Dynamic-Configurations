import { Module } from '@nestjs/common';
import { ConfigsModule } from './_config/configs.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), ConfigsModule],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
