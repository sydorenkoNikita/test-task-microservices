import { Body, Controller, Get } from '@nestjs/common';
import { Notification } from '@db/notification/entity/notification';
import { NotificationService } from '@modules/notification/service';
import { GetNotificationDto } from '@app/shared/dto/get-notification.dto';

@Controller('notification')
export class NotificationServiceController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getOne(@Body() getNotificationDto: GetNotificationDto): Promise<Notification> {
    return this.notificationService.getOne(getNotificationDto);
  }
}
