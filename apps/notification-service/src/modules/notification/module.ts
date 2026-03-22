import { Module } from '@nestjs/common';
import { NotificationService } from '@modules/notification/service';
import { NotificationServiceController } from '@modules/notification/controller';
import { NotificationDbClientModule } from '@modules/common/db/notification/module';

@Module({
  providers: [NotificationService],
  imports: [NotificationDbClientModule],
  controllers: [NotificationServiceController],
})
export class NotificationServiceModule {}
