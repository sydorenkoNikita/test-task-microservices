import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '@modules/user/service';
import { UserDbClientModule } from '@db/user/module';
import { RmqModule } from '@app/shared/infrastructure';
import { RMQ_NOTIFICATION_QUEUE } from '@app/shared/contracts';
import { UserServiceController } from '@modules/user/controller';

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
