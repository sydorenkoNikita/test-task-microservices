import { ScopeName } from '@db/user/scopes';
import { User } from '@db/user/entity/user';
import { UserDto } from '@db/user/dto/user.dto';
import { USERS_REPOSITORY } from '@db/user/providers';
import { GetUserDto } from '@app/shared/dto/get-user.dto';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RECORD_DO_NOT_EXIST_ERROR } from '@app/shared/constants/constants';

@Injectable()
export class UserDbClientService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}

  async getOne({ name, email }: GetUserDto): Promise<UserDto> {
    // prettier-ignore
    const user = await this.userRepository.scope([
      { method: [ScopeName.name, name] },
      { method: [ScopeName.email, email] },
    ])
      .findOne<User>();

    if (!user) {
      throw new BadRequestException(RECORD_DO_NOT_EXIST_ERROR);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    const user = await this.userRepository.create(dto);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
