import { lastValueFrom } from 'rxjs';
import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { RMQ_SERVICE } from '@app/shared/contracts';
import { ClientProxy } from '@nestjs/microservices';
import { EventPublisher } from '@app/shared/infrastructure/events/event-publisher';

@Injectable()
export class RmqEventPublisher extends EventPublisher {
  constructor(@Inject(RMQ_SERVICE) private readonly client: ClientProxy) {
    super();
  }

  async emit<T>(pattern: string, data: T): Promise<void> {
    await lastValueFrom(this.client.emit(pattern, data));
  }
}
