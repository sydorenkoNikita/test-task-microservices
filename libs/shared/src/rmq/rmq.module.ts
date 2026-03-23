import { ConfigService } from '@nestjs/config';
import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_SERVICE } from '@app/shared/constants/rmq.constants';

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
                urls: [config.get<string>('RABBITMQ_URL', 'amqp://localhost:5672')],
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
