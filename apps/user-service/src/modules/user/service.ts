import { lastValueFrom } from 'rxjs';
import { User } from '@db/user/entity/user';
import { ClientProxy } from '@nestjs/microservices';
import { UserDbClientService } from '@db/user/service';
import { GetUserDto } from '@modules/common/db/user/dto/get-user.dto';
import { CreateUserDto } from '@modules/common/db/user/dto/create-user.dto';
import {
  RMQ_SERVICE,
  RMQ_NOTIFICATION_PATTERNS,
} from '@app/shared';
import {
  Inject,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userDbClient: UserDbClientService,
    @Inject(RMQ_SERVICE) private readonly rmqClient: ClientProxy,
  ) {}

  async getOne({ id, email }: GetUserDto): Promise<User> {
    return this.userDbClient.getOne({ id, email });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.userDbClient.create(dto);

    await lastValueFrom(
      this.rmqClient.emit(RMQ_NOTIFICATION_PATTERNS.USER_CREATED, {
        userId: user.id,
        name: user.name,
        email: user.email,
      }),
    );
    return user;
  }
}
