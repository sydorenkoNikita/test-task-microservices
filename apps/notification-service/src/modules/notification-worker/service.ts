import { Job } from 'bullmq';
import {
  Processor,
  WorkerHost,
} from '@nestjs/bullmq';
import { ApiClientService } from '@app/shared/api-client/service';
import { BULL_NOTIFICATION_QUEUE } from '@modules/notification/constants/bull.constants';
import { NotificationJobDto } from '@modules/notification-worker/dto/notification-job.dto';

@Processor(BULL_NOTIFICATION_QUEUE)
export class NotificationWorkerService extends WorkerHost {
  constructor(private readonly apiClientService: ApiClientService) {
    super();
  }

  async process(job: Job<NotificationJobDto>): Promise<void> {
    const { webhookUrl } = job.data;
    await this.apiClientService.get(webhookUrl);
  }
}
