import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import transportConfig from '@config/transport.config';
import schedulesConfig from '@config/schedules.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [transportConfig('transport'), schedulesConfig('schedule')],
    }),
  ],
  providers: [],
  exports: [ConfigModule],
})
export class ConfigsModule {}
