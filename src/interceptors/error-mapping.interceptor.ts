import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorMappingService } from 'src/errors/error-mapping.service';

@Injectable()
export class ErrorMappingInterceptor implements NestInterceptor {
  constructor(private errorMappingService: ErrorMappingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Check if there's an error code in the response
        if (this.hasError(data)) {
          const errorCode = this.getErrorCode(data);
          const errorMessage = this.getErrorMessage(data);

          if (errorCode) {
            const servicePrefix =
              this.errorMappingService.getServicePrefix(errorCode);
            const httpStatus = this.errorMappingService.getHttpStatusForError(
              servicePrefix,
              errorCode,
            );

            throw new HttpException(
              {
                message: errorMessage,
                errorCode,
              },
              httpStatus,
            );
          }
        }
        return data;
      }),
    );
  }

  private hasError(data: any): boolean {
    return (
      data &&
      (data.status !== undefined ||
        (data.error &&
          (data.error.code !== undefined || Array.isArray(data.error))))
    );
  }

  private getErrorCode(data: any): number | null {
    if (data.status !== undefined) return data.status;
    if (data.error && data.error.code !== undefined) return data.error.code;
    return null;
  }

  private getErrorMessage(data: any): string {
    if (data.error && data.error.message) return data.error.message;
    if (Array.isArray(data.error)) return data.error.join(', ');
    return 'Unknown error';
  }
}
