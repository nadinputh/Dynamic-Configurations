import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { SchedulerService } from './scheduler.service';

@Module({
  providers: [TasksService, SchedulerService],
})
export class TasksModule {}
