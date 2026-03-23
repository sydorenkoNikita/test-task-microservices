import { NotificationStatus } from '@app/shared';

export class NotificationJobDto {
  sentAt: Date;
  userId: string;
  message: string;
  webhookUrl: string;
  status: NotificationStatus;
}
