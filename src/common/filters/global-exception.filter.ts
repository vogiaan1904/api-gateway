import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
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

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors = null;

    this.logger.debug(
      'Full exception object:',
      JSON.stringify(exception, null, 2),
    );

    if (exception instanceof BadRequestException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;

      if (
        exceptionResponse.message &&
        Array.isArray(exceptionResponse.message)
      ) {
        message = 'Validation failed';
        errors = exceptionResponse.message.map((error) => {
          if (typeof error === 'object' && error.constraints) {
            return {
              property: error.property,
              constraints: Object.values(error.constraints),
            };
          }
          return { message: error };
        });
      } else {
        message = exceptionResponse.message || 'Bad request';
        errors = {
          code: exceptionResponse.errorCode,
          message: exceptionResponse.errorMessage || message,
        };
      }
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;
      message = exceptionResponse.message || exception.message;
      errors = {
        code: exceptionResponse.errorCode,
        message: exceptionResponse.errorMessage || message,
      };
    } else if (exception.code !== undefined) {
      message = exception.details;
      switch (exception.code) {
        case GrpcStatus.INVALID_ARGUMENT:
          statusCode = HttpStatus.BAD_REQUEST;
          break;
        case GrpcStatus.NOT_FOUND:
          statusCode = HttpStatus.BAD_REQUEST;
          break;
        case GrpcStatus.PERMISSION_DENIED:
          statusCode = HttpStatus.FORBIDDEN;
          break;
        case GrpcStatus.UNAUTHENTICATED:
          statusCode = HttpStatus.UNAUTHORIZED;
          break;
        default:
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      }
    }

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
      errors: Array.isArray(errors) ? errors : errors ? [errors] : null,
    };

    response.status(statusCode).json(responseBody);
  }
}
