import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Notification } from '@db/notification/entity/notification';
import { NotificationDBClientService } from '@db/notification/service';
import { NotificationStatus } from '@app/shared/types/notification.types';
import { CreateNotificationDto } from '@modules/notification/dto/create-notification.dto';
import { BULL_NOTIFICATION_DELAY_MS, BULL_NOTIFICATION_QUEUE } from '@app/shared/constants/bull.constants';

@Injectable()
export class NotificationService {
  constructor(
    @InjectQueue(BULL_NOTIFICATION_QUEUE)
    private readonly notificationQueue: Queue<CreateNotificationDto>,
    private readonly configService: ConfigService,
    private readonly notificationDbClient: NotificationDBClientService,
  ) {}

  async create(dto: CreateNotificationDto): Promise<Notification> {
    const { userId, message } = dto;
    const webhookUrl = this.configService.get<string>('WEBHOOK_URL');

    return this.notificationDbClient.create({
      userId,
      message,
      webhookUrl,
      sentAt: new Date(),
      status: NotificationStatus.PENDING,
    });
  }

  async addToQueue(dto: CreateNotificationDto): Promise<void> {
    await this.notificationQueue.add('send-notification', dto, {
      delay: BULL_NOTIFICATION_DELAY_MS,
      removeOnComplete: true,
    });
  }
}
