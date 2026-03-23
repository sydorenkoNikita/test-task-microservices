import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiClientModule } from '@app/shared/api-client/module';
import { NotificationService } from '@modules/notification/service';
import { BULL_NOTIFICATION_QUEUE } from '@app/shared/constants/bull.constants';
import { NotificationServiceController } from '@modules/notification/controller';
import { NotificationWorkerService } from '@modules/notification-worker/service';
import { NotificationDbClientModule } from '@modules/common/db/notification/module';

@Module({
  providers: [NotificationService, NotificationWorkerService],
  controllers: [NotificationServiceController],
  imports: [
    ApiClientModule,
    NotificationDbClientModule,
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', 'redis'),
          port: Number(configService.get<string>('REDIS_PORT', '6379')),
          password: configService.get<string>('REDIS_PASSWORD') || undefined,
        },
      }),
    }),
    BullModule.registerQueue({
      name: BULL_NOTIFICATION_QUEUE,
    }),
  ],
})
export class NotificationServiceModule {}
