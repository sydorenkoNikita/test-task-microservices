import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationServiceService {
  getOne(): string {
    return 'Notification';
  }
}
