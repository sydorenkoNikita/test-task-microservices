import { NestFactory } from '@nestjs/core';
import { NotificationServiceModule } from '@modules/notification/module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationServiceModule);
  const port = Number(process.env.NOTIFICATION_SERVICE_PORT ?? process.env.PORT ?? 3002);

  await app.listen(port);
}
bootstrap();
