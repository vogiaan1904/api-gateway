import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/microservices/auth/auth.pb';

@Injectable()
export class AuthErrorMapper {
  private errorMap: Map<number, number> = new Map();

  constructor() {
    // Authentication errors (100100-100199)
    this.errorMap.set(ErrorCode.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    this.errorMap.set(ErrorCode.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    this.errorMap.set(ErrorCode.TOKEN_EXPIRED, HttpStatus.UNAUTHORIZED);
    this.errorMap.set(ErrorCode.REFRESH_TOKEN_EXPIRED, HttpStatus.UNAUTHORIZED);
    this.errorMap.set(ErrorCode.TOKEN_NOT_FOUND, HttpStatus.UNAUTHORIZED);

    // Registration errors (100200-100299)
    this.errorMap.set(ErrorCode.EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT);
    this.errorMap.set(ErrorCode.INVALID_EMAIL_FORMAT, HttpStatus.BAD_REQUEST);
    this.errorMap.set(
      ErrorCode.INVALID_PASSWORD_FORMAT,
      HttpStatus.BAD_REQUEST,
    );
    this.errorMap.set(ErrorCode.REGISTRATION_FAILED, HttpStatus.BAD_REQUEST);

    // Verification errors (100300-100399)
    this.errorMap.set(ErrorCode.EMAIL_NOT_VERIFIED, HttpStatus.FORBIDDEN);
    this.errorMap.set(
      ErrorCode.VERIFICATION_TOKEN_EXPIRED,
      HttpStatus.BAD_REQUEST,
    );
    this.errorMap.set(
      ErrorCode.VERIFICATION_TOKEN_INVALID,
      HttpStatus.BAD_REQUEST,
    );

    // Password reset errors (100400-100499)
    this.errorMap.set(ErrorCode.RESET_TOKEN_EXPIRED, HttpStatus.BAD_REQUEST);
    this.errorMap.set(ErrorCode.RESET_TOKEN_INVALID, HttpStatus.BAD_REQUEST);
    this.errorMap.set(ErrorCode.PASSWORD_RESET_FAILED, HttpStatus.BAD_REQUEST);
  }

  getHttpStatus(errorCode: number): number {
    return this.errorMap.get(errorCode) || HttpStatus.BAD_REQUEST;
  }
}
