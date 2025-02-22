import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthController } from './health/health.controller';
import clientConfig from './_config/transport.config';
import { TerminusModule } from '@nestjs/terminus';
import schedulesConfig from './_config/schedules.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [clientConfig('transport'), schedulesConfig],
    }),
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
