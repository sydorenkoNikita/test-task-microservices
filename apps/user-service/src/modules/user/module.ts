import { Module } from '@nestjs/common';
import { UserDbClientModule } from '@db/user/module';
import { UserServiceService } from '@modules/user/service';
import { UserServiceController } from '@modules/user/controller';

@Module({
  imports: [UserDbClientModule],
  providers: [UserServiceService],
  controllers: [UserServiceController],
})
export class UserServiceModule {}
