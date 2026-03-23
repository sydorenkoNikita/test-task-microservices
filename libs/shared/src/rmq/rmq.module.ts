import { RMQ_SERVICE } from '@app/shared';
import { ConfigService } from '@nestjs/config';
import {
  Module,
  DynamicModule,
} from '@nestjs/common';
import {
  Transport,
  ClientsModule,
} from '@nestjs/microservices';

@Module({})
export class RmqModule {
  static register(queue: string): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: RMQ_SERVICE,
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [
                  config.get<string>('RABBITMQ_URL', 'amqp://localhost:5672'),
                ],
                queue,
                queueOptions: { durable: true },
              },
            }),
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
