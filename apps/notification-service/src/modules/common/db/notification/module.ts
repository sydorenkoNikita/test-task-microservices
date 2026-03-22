import { Module } from '@nestjs/common';
import { DatabaseModule } from '@db/module';
import { notificationsProviders } from '@db/notification/providers';
import { NotificationDBClientService } from '@db/notification/service';

@Module({
  imports: [DatabaseModule],
  exports: [NotificationDBClientService],
  providers: [...notificationsProviders, NotificationDBClientService],
})
export class NotificationDbClientModule {}
