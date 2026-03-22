import { Module } from '@nestjs/common';
import { DatabaseModule } from '@db/module';
import { usersProviders } from '@db/user/providers';
import { UserDbClientService } from '@db/user/service';

@Module({
  imports: [DatabaseModule],
  exports: [UserDbClientService],
  providers: [...usersProviders, UserDbClientService],
})
export class UserDbClientModule {}
