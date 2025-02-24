import { ScheduleModel } from '@/_config/schedules.config';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TasksService implements OnModuleInit {
  private readonly client: ClientProxy;
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly config: ConfigService,
    private readonly scheduler: SchedulerRegistry,
  ) {
    this.client = ClientProxyFactory.create(config.get('transport'));
  }

  onModuleInit() {
    const schedules = this.config.get<Array<ScheduleModel>>('schedule.jobs');
    schedules.forEach((schedule) => {
      if (!schedule.enabled) {
        this.logger.verbose(
          `time (${schedule.cron}) for job ${schedule.name} skipped!`,
        );
        return;
      }
      const job = new CronJob(`${schedule.cron}`, () => {
        this.logger.warn(
          `last date: ${this.scheduler.getCronJob(schedule.name).lastDate()}`,
        );
        this.logger.debug(
          `time (${schedule.cron}) for job ${schedule.name} to run!`,
        );
        if (!!schedule.event) {
          this.client.emit(
            `${this.config.get('schedule.prefix', 'schedule:')}${schedule.event}`,
            schedule,
          );
        }
      });
      this.scheduler.addCronJob(schedule.name, job as any);
      job.start();

      this.logger.debug(
        `job ${schedule.name} added for time (${schedule.cron})!`,
      );
    });
  }
}
