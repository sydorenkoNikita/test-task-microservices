import { Module } from '@nestjs/common';
import { databaseProviders } from '@db/providers';

@Module({
  exports: [...databaseProviders],
  providers: [...databaseProviders],
})
export class DatabaseModule {}
