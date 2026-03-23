import { NotificationStatus } from '@app/shared/types/notification.types';

export class NotificationJobDto {
  sentAt: Date;
  userId: string;
  message: string;
  webhookUrl: string;
  status: NotificationStatus;
}
