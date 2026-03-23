import { Controller } from '@nestjs/common';
import { NotificationService } from '@modules/notification/service';
import {
  Ctx,
  Payload,
  RmqContext,
  EventPattern,
} from '@nestjs/microservices';
import {
  UserCreatedEventDto,
  RMQ_NOTIFICATION_PATTERNS,
  DEFAULT_NOTIFICATION_MESSAGE,
} from '@app/shared';

@Controller('notifications')
export class NotificationServiceController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern(RMQ_NOTIFICATION_PATTERNS.USER_CREATED)
  async handleUserCreated(
    @Payload() userCreatedData: UserCreatedEventDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    const { userId } = userCreatedData;

    const notification = await this.notificationService.create({
      userId,
      message: DEFAULT_NOTIFICATION_MESSAGE,
    });

    await this.notificationService.addToQueue(notification);
    channel.ack(originalMsg);
  }
}
