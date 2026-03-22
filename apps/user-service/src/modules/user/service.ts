import { Injectable } from '@nestjs/common';
import { UserDto } from '@db/user/dto/user.dto';
import { UserDbClientService } from '@db/user/service';
import { GetUserDto } from '@app/shared/dto/get-user.dto';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';

@Injectable()
export class UserServiceService {
  constructor(private readonly userDbClient: UserDbClientService) {}

  async getOne({ id, email }: GetUserDto): Promise<UserDto> {
    return this.userDbClient.getOne({ id, email });
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    return this.userDbClient.create(dto);
  }
}
