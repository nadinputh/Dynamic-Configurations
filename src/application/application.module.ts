import { Module } from '@nestjs/common';
import { TasksService } from './crontab/tasks.service';
import { DomainModule } from '@/domain/domain.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { AppController } from './controller/app.controller';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
      gracefulShutdownTimeoutMs: 1000,
    }),
    DomainModule,
  ],
  controllers: [HealthController, AppController],
  providers: [TasksService],
})
export class ApplicationModule {}
