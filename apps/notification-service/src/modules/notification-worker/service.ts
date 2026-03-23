import { Job } from 'bullmq';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { ApiClientService } from '@app/shared/api-client/service';
import { NotificationJobDto } from '@app/shared/dto/notification-job.dto';
import { BULL_NOTIFICATION_QUEUE } from '@app/shared/constants/bull.constants';

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
