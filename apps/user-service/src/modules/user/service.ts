import { lastValueFrom } from 'rxjs';
import { UserDto } from '@app/shared/dto/user-created-event.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { UserDbClientService } from '@db/user/service';
import { GetUserDto } from '@modules/common/db/user/dto/get-user.dto';
import { CreateUserDto } from '@modules/common/db/user/dto/create-user.dto';
import { RMQ_NOTIFICATION_PATTERNS, RMQ_SERVICE } from '@app/shared/constants/rmq.constants';

@Injectable()
export class UserService {
  constructor(
    private readonly userDbClient: UserDbClientService,
    @Inject(RMQ_SERVICE) private readonly rmqClient: ClientProxy,
  ) {}

  async getOne({ id, email }: GetUserDto): Promise<UserDto> {
    return this.userDbClient.getOne({ id, email });
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
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
