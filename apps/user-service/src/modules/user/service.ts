import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';

@Injectable()
export class UserServiceService {
  getOne(): string {
    return 'User';
  }

  create(dto: CreateUserDto): CreateUserDto {
    return dto;
  }
}
