import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import transportConfig from '@/infrastructure/_config/transport.config';
import databaseConfig from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig('database'), transportConfig('transport')],
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigsModule {}
