import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class GetNotificationDto {
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  webhookUrl: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
