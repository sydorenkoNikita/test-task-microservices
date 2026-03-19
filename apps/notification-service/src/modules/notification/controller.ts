import { Get } from '@nestjs/common';
import { NotificationServiceService } from '@modules/notification/service';

export class NotificationServiceController {
  constructor(private readonly notificationServiceService: NotificationServiceService) {}

  @Get()
  getOne(): string {
    return this.notificationServiceService.getOne();
  }
}
