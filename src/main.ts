import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enabled helmet
  app.use(helmet());

  // instance config from app
  const config = app.get(ConfigService);

  // config serialization
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // config API versioning with Media Type (Accept Header)
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  // config server running port
  const port = config.get('PORT', 3000);
  await app.listen(port);
}

bootstrap();
