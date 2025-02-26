import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@/infrastructure/infrastructure.module';
import { ConfigurationService } from './service/configuration.service';

@Module({
  imports: [InfrastructureModule],
  providers: [ConfigurationService],
})
export class DomainModule {}
