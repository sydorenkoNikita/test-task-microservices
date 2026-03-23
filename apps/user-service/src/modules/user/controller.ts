import {
  Body,
  Post,
  Controller,
} from '@nestjs/common';
import { User } from '@db/user/entity/user';
import { UserService } from '@modules/user/service';
import { CreateUserDto } from '@modules/common/db/user/dto/create-user.dto';

@Controller('users')
export class UserServiceController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
