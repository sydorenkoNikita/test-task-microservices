import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationServiceModule } from '@modules/notification/module';
import { RMQ_NOTIFICATION_QUEUE } from '@app/shared/constants/rmq.constants';

async function bootstrap() {
  const app = await NestFactory.create(NotificationServiceModule);
  const port = Number(process.env.NOTIFICATION_SERVICE_PORT ?? process.env.PORT ?? 3002);
  const config = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [config.get<string>('RABBITMQ_URL', 'amqp://localhost:5672')],
      queue: RMQ_NOTIFICATION_QUEUE,
      noAck: false,
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
