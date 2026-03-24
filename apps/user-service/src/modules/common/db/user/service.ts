import { ScopeName } from '@db/user/scopes';
import { User } from '@db/user/entity/user';
import { USERS_REPOSITORY } from '@db/user/providers';
import { RECORD_DO_NOT_EXIST_ERROR } from '@app/shared/constants';
import { GetUserDto } from '@modules/common/db/user/dto/get-user.dto';
import { CreateUserDto } from '@modules/common/db/user/dto/create-user.dto';
import {
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class UserDbClientService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}

  async getOne({ name, email }: GetUserDto): Promise<User> {
    const user = await this.userRepository
      .scope([
        { method: [ScopeName.name, name] },
        { method: [ScopeName.email, email] },
      ])
      .findOne<User>();

    if (!user) {
      throw new BadRequestException(RECORD_DO_NOT_EXIST_ERROR);
    }

    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this.userRepository.create(dto);
  }
}
