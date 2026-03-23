import { ScopeName } from '@db/notification/scopes';
import { Notification } from '@db/notification/entity/notification';
import { NOTIFICATIONS_REPOSITORY } from '@db/notification/providers';
import {
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { RECORD_DO_NOT_EXIST_ERROR } from '@app/shared';
import { GetNotificationDto } from '@modules/common/db/notification/dto/get-notification.dto';
import { CreateNotificationRecordDto } from '@modules/common/db/notification/dto/create-notification-record.dto';

@Injectable()
export class NotificationDBClientService {
  constructor(
    @Inject(NOTIFICATIONS_REPOSITORY)
    private readonly notificationRepository: typeof Notification,
  ) {}

  async getOne(
    { webhookUrl, userId }: GetNotificationDto,
    disableValidation?: boolean,
  ): Promise<Notification> {
    const notification = await this.notificationRepository
      .scope([
        { method: [ScopeName.userId, userId] },
        { method: [ScopeName.webhookUrl, webhookUrl] },
      ])
      .findOne<Notification>();

    if (!notification && !disableValidation) {
      throw new BadRequestException(RECORD_DO_NOT_EXIST_ERROR);
    }

    return notification;
  }

  async create(dto: CreateNotificationRecordDto): Promise<Notification> {
    return this.notificationRepository.create(dto);
  }
}
