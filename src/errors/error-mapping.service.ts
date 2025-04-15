import { Injectable } from '@nestjs/common';
import { AuthErrorMapper } from './mappers/auth-error.mapper';
// Import other mappers

@Injectable()
export class ErrorMappingService {
  private errorMappers: Map<string, any> = new Map();

  constructor(
    private authErrorMapper: AuthErrorMapper,
    // Inject other mappers
  ) {
    this.errorMappers.set('auth', authErrorMapper);
    // Add other mappers to the map
  }

  getHttpStatusForError(servicePrefix: string, errorCode: number): number {
    const mapper = this.errorMappers.get(servicePrefix);
    if (mapper) {
      return mapper.getHttpStatus(errorCode);
    }

    // Default handling
    return this.getDefaultHttpStatus(errorCode);
  }

  private getDefaultHttpStatus(errorCode: number): number {
    // Default logic - you could use the first digit after service prefix
    // For example: x01xxx = 400, x04xxx = 404, x05xxx = 500
    const errorType = Math.floor((errorCode % 100000) / 1000);

    switch (errorType) {
      case 4:
        return 404;
      case 5:
        return 500;
      default:
        return 400;
    }
  }

  getServicePrefix(errorCode: number): string {
    // Extract the service identifier from the error code
    // For auth: 1xxxxx, For product: 3xxxxx
    const serviceId = Math.floor(errorCode / 100000);

    switch (serviceId) {
      case 1:
        return 'auth';
      case 3:
        return 'product';
      // Add other services
      default:
        return 'unknown';
    }
  }
}
