import { NotificationStatus } from '@modules/common/db/notification/types/notification.types';
import {
  IsUrl,
  IsDate,
  IsEnum,
  IsString,
  IsNotEmpty,
} from 'class-validator';

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
