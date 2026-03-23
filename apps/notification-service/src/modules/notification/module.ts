import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationService } from '@modules/notification/service';
import { NotificationServiceController } from '@modules/notification/controller';
import { NotificationDbClientModule } from '@modules/common/db/notification/module';

@Module({
  providers: [NotificationService],
  controllers: [NotificationServiceController],
  imports: [NotificationDbClientModule, ConfigModule],
})
export class NotificationServiceModule {}
