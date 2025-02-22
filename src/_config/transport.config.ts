import { registerAs } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

export default (config: string) =>
  registerAs(
    config,
    (): RmqOptions => ({
      transport: Transport.RMQ,
      options: {
        urls: [
          {
            hostname: process.env.RABBIT_HOST,
            port: parseInt(process.env.RABBIT_PORT),
            username: process.env.RABBIT_USER,
            password: process.env.RABBIT_PASSWORD,
          },
        ],
        consumerTag: 'runner-service',
      },
    }),
  );
