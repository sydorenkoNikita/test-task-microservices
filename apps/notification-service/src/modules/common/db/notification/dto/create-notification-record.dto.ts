import { NotificationStatus } from '@app/shared/types/notification.types';
import { IsDate, IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateNotificationRecordDto {
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  webhookUrl: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDate()
  @IsNotEmpty()
  sentAt: Date;

  @IsEnum(NotificationStatus)
  @IsNotEmpty()
  status: NotificationStatus;
}
