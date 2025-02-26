import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller({ version: '1' })
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @Get('config')
  getConfig(@Query('config') conf: string): any {
    return {
      configs: {
        config: this.config.get(conf),
      },
    };
  }
}
