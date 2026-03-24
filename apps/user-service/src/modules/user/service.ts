import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { User } from '@db/user/entity/user';
import { USER_EVENTS } from '@app/shared/contracts';
import { UserDbClientService } from '@db/user/service';
import { EVENT_PUBLISHER } from '@app/shared/constants';
import { GetUserDto } from '@modules/common/db/user/dto/get-user.dto';
import { CreateUserDto } from '@modules/common/db/user/dto/create-user.dto';
import { EventPublisher } from '@app/shared/infrastructure/events/event-publisher';

@Injectable()
export class UserService {
  constructor(
    private readonly userDbClient: UserDbClientService,
    @Inject(EVENT_PUBLISHER)
    private readonly eventPublisher: EventPublisher,
  ) {}

  async getOne({ id, email }: GetUserDto): Promise<User> {
    return this.userDbClient.getOne({ id, email });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.userDbClient.create(dto);

    await this.eventPublisher.emit(USER_EVENTS.CREATED, {
      userId: user.id,
      name: user.name,
      email: user.email,
    });
    return user;
  }
}
