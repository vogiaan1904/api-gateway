import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { status as GrpcStatus } from '@grpc/grpc-js';
import { HttpResponse } from 'src/types/response.type';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly configService: ConfigService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Default values
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors = null;

    this.logger.debug(
      'Full exception object:',
      JSON.stringify(exception, null, 2),
    );

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;
      message = exceptionResponse.message || exception.message;
      errors = {
        code: exceptionResponse.errorCode,
        message: exceptionResponse.errorMessage || message,
      };
    } else if (exception.code !== undefined) {
      switch (exception.code) {
        case GrpcStatus.INVALID_ARGUMENT:
          statusCode = HttpStatus.BAD_REQUEST;
          message = 'Wrong request format';
          errors = {
            code: exception.code,
            message: exception.details,
          };
          break;
        case GrpcStatus.NOT_FOUND:
          statusCode = HttpStatus.NOT_FOUND;
          message = 'Resource not found';

          break;
        case GrpcStatus.PERMISSION_DENIED:
          statusCode = HttpStatus.FORBIDDEN;
          message = 'Permission denied';
          break;
        default:
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = 'Internal server error';
      }
    }

    // Log the exception details
    this.logger.error({
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      statusCode,
      message:
        exception instanceof Error
          ? exception.message
          : typeof message === 'string'
            ? message
            : JSON.stringify(message),
      stack: exception instanceof Error ? exception.stack : null,
    });

    const responseBody: HttpResponse = {
      code: statusCode,
      message: message,
      data: null,
      errors: errors ? [errors] : null,
    };

    response.status(statusCode).json(responseBody);
  }
}
