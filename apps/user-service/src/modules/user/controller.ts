import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { UserServiceService } from '@modules/user/service';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Get()
  getOne(): string {
    return this.userServiceService.getOne();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): CreateUserDto {
    return this.userServiceService.create(createUserDto);
  }
}
