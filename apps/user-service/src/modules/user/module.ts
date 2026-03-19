import { Module } from '@nestjs/common';
import { UserServiceController } from '@modules/user/controller';
import { UserServiceService } from '@modules/user/service';

@Module({
  imports: [],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule {}
