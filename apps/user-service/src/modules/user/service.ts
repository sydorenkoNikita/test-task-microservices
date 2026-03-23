import { lastValueFrom } from 'rxjs';
import { UserDto } from '@app/shared/dto/user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UserDbClientService } from '@db/user/service';
import { GetUserDto } from '@app/shared/dto/get-user.dto';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { NOTIFICATION_PATTERNS, RMQ_SERVICE } from '@app/shared/constants/rmq.constants';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userDbClient: UserDbClientService,
    @Inject(RMQ_SERVICE) private readonly rmqClient: ClientProxy,
  ) {}

  async onModuleInit() {
    let connected = false;

    while (!connected) {
      try {
        await this.rmqClient.connect();
        connected = true;
        this.logger.log('Connected to RMQ');
      } catch (err) {
        this.logger.warn('RMQ not ready, retrying...', err);
        await new Promise((res) => setTimeout(res, 3000));
      }
    }
  }

  async getOne({ id, email }: GetUserDto): Promise<UserDto> {
    return this.userDbClient.getOne({ id, email });
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    const user = await this.userDbClient.create(dto);

    await lastValueFrom(
      this.rmqClient.emit(NOTIFICATION_PATTERNS.USER_CREATED, {
        userId: user.id,
        name: user.name,
        email: user.email,
      }),
    );
    return user;
  }
}
