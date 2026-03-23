import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '@modules/user/service';
import { UserDbClientModule } from '@db/user/module';
import { UserServiceController } from '@modules/user/controller';
import {
  RmqModule,
  RMQ_NOTIFICATION_QUEUE,
} from '@app/shared';

@Module({
  providers: [UserService],
  controllers: [UserServiceController],
  imports: [
    UserDbClientModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RmqModule.register(RMQ_NOTIFICATION_QUEUE),
  ],
})
export class UserServiceModule {}
