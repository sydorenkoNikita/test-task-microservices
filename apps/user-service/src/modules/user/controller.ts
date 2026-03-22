import { UserDto } from '@db/user/dto/user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { UserServiceService } from '@modules/user/service';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userServiceService.create(createUserDto);
  }
}
