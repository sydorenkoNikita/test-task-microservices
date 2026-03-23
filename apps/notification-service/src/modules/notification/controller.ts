import { Controller } from '@nestjs/common';
import { UserCreatedDto } from '@app/shared/dto/user-created-event.dto';
import { NotificationService } from '@modules/notification/service';
import { RMQ_NOTIFICATION_PATTERNS } from '@app/shared/constants/rmq.constants';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { DEFAULT_NOTIFICATION_MESSAGE } from '@app/shared/constants/constants';

@Controller('notifications')
export class NotificationServiceController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern(RMQ_NOTIFICATION_PATTERNS.USER_CREATED)
  async handleUserCreated(@Payload() userCreatedData: UserCreatedDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    const { userId } = userCreatedData;

    const notification = await this.notificationService.create({ userId, message: DEFAULT_NOTIFICATION_MESSAGE });
    await this.notificationService.addToQueue(notification);
    channel.ack(originalMsg);
  }
}
