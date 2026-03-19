import { CreateNotificationDto } from '@app/shared/dto/create-notification.dto';

export class NotificationWorkerService {
  sendNotification(dto: CreateNotificationDto): CreateNotificationDto {
    return dto;
  }
}
