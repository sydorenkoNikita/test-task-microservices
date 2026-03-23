import { Body, Controller, Get } from '@nestjs/common';
import { UserCreatedDto } from '@app/shared/dto/user.dto';
import { Notification } from '@db/notification/entity/notification';
import { NotificationService } from '@modules/notification/service';
import { GetNotificationDto } from '@app/shared/dto/get-notification.dto';
import { NOTIFICATION_PATTERNS } from '@app/shared/constants/rmq.constants';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { DEFAULT_NOTIFICATION_MESSAGE } from '@app/shared/constants/constants';

@Controller('notification')
export class NotificationServiceController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getOne(@Body() getNotificationDto: GetNotificationDto): Promise<Notification> {
    return this.notificationService.getOne(getNotificationDto);
  }

  @EventPattern(NOTIFICATION_PATTERNS.USER_CREATED)
  async handleUserCreated(@Payload() userCreatedData: UserCreatedDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    const { userId } = userCreatedData;

    await this.notificationService.createNotification({ userId, message: DEFAULT_NOTIFICATION_MESSAGE });
    channel.ack(originalMsg);
  }
}
