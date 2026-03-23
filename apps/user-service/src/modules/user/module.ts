import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '@modules/user/service';
import { UserDbClientModule } from '@db/user/module';
import { RmqModule } from '@app/shared/rmq/rmq.module';
import { UserServiceController } from '@modules/user/controller';
import { NOTIFICATION_QUEUE } from '@app/shared/constants/rmq.constants';

@Module({
  providers: [UserService],
  controllers: [UserServiceController],
  imports: [UserDbClientModule, ConfigModule.forRoot({ isGlobal: true }), RmqModule.register(NOTIFICATION_QUEUE)],
})
export class UserServiceModule {}
