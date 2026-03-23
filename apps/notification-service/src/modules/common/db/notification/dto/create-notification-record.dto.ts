import { NotificationStatus } from '@app/shared';
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
