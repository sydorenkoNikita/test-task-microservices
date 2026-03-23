import { UserDto } from '@app/shared/dto/user-created-event.dto';
import { UserService } from '@modules/user/service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@modules/common/db/user/dto/create-user.dto';

@Controller('users')
export class UserServiceController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }
}
