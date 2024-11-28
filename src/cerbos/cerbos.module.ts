import { Global, Module } from '@nestjs/common';
import { CerbosService } from './cerbos.service';

@Global()
@Module({
  providers: [CerbosService],
  exports: [CerbosService],
})
export class CerbosModule {}
