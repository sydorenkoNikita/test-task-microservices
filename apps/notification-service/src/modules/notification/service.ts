import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationStatus } from '@app/shared/types';
import { Notification } from '@db/notification/entity/notification';
import { NotificationDBClientService } from '@db/notification/service';
import { GetNotificationDto } from '@app/shared/dto/get-notification.dto';
import { CreateNotificationDto } from '@app/shared/dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly notificationDbClient: NotificationDBClientService,
  ) {}

  async getOne({ webhookUrl, userId }: GetNotificationDto): Promise<Notification> {
    return this.notificationDbClient.getOne({ webhookUrl, userId });
  }

  async createNotification(dto: CreateNotificationDto): Promise<Notification> {
    const { userId, message } = dto;
    const webhookUrl = this.configService.get<string>('WEBHOOK_URL');
    console.log('webhookUrl', webhookUrl);

    return this.notificationDbClient.create({
      userId,
      message,
      webhookUrl,
      sentAt: new Date(),
      status: NotificationStatus.PENDING,
    });
  }
}
