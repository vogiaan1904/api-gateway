import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { status as GrpcStatus } from '@grpc/grpc-js';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Default values
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorDetail = 'An unexpected error occurred';

    // Log the full exception
    this.logger.error(
      `Exception caught: ${exception.message}`,
      exception.stack,
    );

    // Handle different types of exceptions
    if (exception instanceof HttpException) {
      // Handle standard HttpExceptions
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;

      message = exceptionResponse.message || exception.message;

      // Convert array errors to a single string with comma separation
      if (Array.isArray(message)) {
        errorDetail = message.join(', ');
      } else if (exceptionResponse.error) {
        errorDetail = exceptionResponse.error;
      } else {
        errorDetail = message;
      }
    } else if (exception.code !== undefined) {
      // Handle gRPC errors based on the error code
      switch (exception.code) {
        case GrpcStatus.INVALID_ARGUMENT: // 3
          statusCode = HttpStatus.BAD_REQUEST;
          message = 'Wrong request format';

          // Format details as a single error string
          if (exception.details) {
            if (Array.isArray(exception.details)) {
              errorDetail = exception.details.join(', ');
            } else {
              errorDetail = exception.details;
            }
          } else {
            errorDetail = exception.message;
          }
          break;

        case GrpcStatus.NOT_FOUND: // 5
          statusCode = HttpStatus.NOT_FOUND;
          message = 'Resource not found';
          errorDetail = exception.details || exception.message;
          break;

        case GrpcStatus.PERMISSION_DENIED: // 7
          statusCode = HttpStatus.FORBIDDEN;
          message = 'Permission denied';
          break;

        default:
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = 'Internal server error';
          errorDetail =
            exception.details ||
            exception.message ||
            'An unexpected error occurred';
      }
    } else {
      // Handle generic errors
      message = exception.message || 'Internal server error';
      errorDetail = exception.message || 'An unexpected error occurred';
    }

    // Log the processed error - FIX IS HERE
    this.logger.error(
      `Request failed: ${request.method} ${request.url} - Status: ${statusCode} - Message: ${message}`,
    );

    // Return a consistent error response format
    response.status(statusCode).json({
      statusCode,
      message,
      data: null, // Include null data to match success format
      error: errorDetail, // Keep error for detailed information
    });
  }
}
