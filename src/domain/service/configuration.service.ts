import { ConfigAdapter } from '@/infrastructure/_config/config.adapter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { resolve } from 'path';

@Injectable()
export class ConfigurationService extends ConfigAdapter {
  readonly name: string = 'schedule';
  constructor(readonly config: ConfigService) {
    super();
  }

  load(): Promise<Record<string, any>> | Record<string, any> {
    // TODO: Load config from DB and Transform Data / Configurations
    return yaml.load(readFileSync(resolve('schedule.yaml'), 'utf8')) as Record<
      string,
      any
    >;
  }
}
