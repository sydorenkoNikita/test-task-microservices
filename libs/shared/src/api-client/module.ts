import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiClientService } from '@app/shared/api-client/service';

@Module({
  exports: [ApiClientService],
  providers: [ApiClientService],
  imports: [HttpModule.register({ timeout: 5000, maxRedirects: 5 })],
})
export class ApiClientModule {}
