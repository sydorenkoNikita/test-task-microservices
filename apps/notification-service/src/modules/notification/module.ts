import { Module } from '@nestjs/common';
import { NotificationServiceService } from '@modules/notification/service';

@Module({
  imports: [],
  providers: [NotificationServiceService],
})
export class NotificationServiceModule {}
