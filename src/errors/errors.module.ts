import { Module, Global } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorMappingService } from './error-mapping.service';
import { AuthErrorMapper } from './mappers/auth-error.mapper';
import { ErrorMappingInterceptor } from 'src/interceptors/error-mapping.interceptor';

@Global()
@Module({
  providers: [
    ErrorMappingService,
    AuthErrorMapper,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorMappingInterceptor,
    },
  ],
  exports: [ErrorMappingService],
})
export class ErrorModule {}
