import { Injectable } from '@nestjs/common';
import { Notification } from '@db/notification/entity/notification';
import { NotificationDBClientService } from '@db/notification/service';
import { GetNotificationDto } from '@app/shared/dto/get-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationDbClient: NotificationDBClientService) {}

  async getOne({ webhookUrl, userId }: GetNotificationDto): Promise<Notification> {
    return this.notificationDbClient.getOne({ webhookUrl, userId });
  }
}
