import { Job } from 'bullmq';
import {
  Processor,
  WorkerHost,
} from '@nestjs/bullmq';
import {
  ApiClientService,
  NotificationJobDto,
  BULL_NOTIFICATION_QUEUE,
} from '@app/shared';

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
