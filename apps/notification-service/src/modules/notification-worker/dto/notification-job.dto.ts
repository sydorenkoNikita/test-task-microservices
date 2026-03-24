import { NotificationStatus } from '@modules/common/db/notification/types/notification.types';

export class NotificationJobDto {
  sentAt: Date;
  userId: string;
  message: string;
  webhookUrl: string;
  status: NotificationStatus;
}
