import { IsDate, IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { NotificationStatus } from '@app/shared/types';

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
