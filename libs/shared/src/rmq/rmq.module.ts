import {
  Module,
  DynamicModule,
} from '@nestjs/common';
import {
  Transport,
  ClientsModule,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RMQ_SERVICE } from '@app/shared/contracts';
import { EVENT_PUBLISHER } from '@app/shared/constants';
import { RmqEventPublisher } from '@app/shared/infrastructure/events/rmq-event-publisher';

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
      providers: [
        {
          provide: EVENT_PUBLISHER,
          useClass: RmqEventPublisher,
        },
      ],
      exports: [ClientsModule, EVENT_PUBLISHER],
    };
  }
}
