import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '@/health/health.controller';
import { TasksModule } from '@/tasks/tasks.module';
import { ConfigsModule } from './_config/configs.module';

@Module({
  imports: [
    ConfigsModule,
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
      gracefulShutdownTimeoutMs: 1000,
    }),
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
