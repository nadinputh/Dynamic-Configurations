import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { resolve } from 'path';

const YAML_CONFIG_FILENAME = 'schedules.yaml';

export default () => {
  return yaml.load(
    readFileSync(resolve(YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};

export interface ScheduleModel {
  enabled: boolean;
  name: string;
  cron: string;
  event?: string;
}
