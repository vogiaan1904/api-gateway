// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v5.29.3
// source: auth.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

/** Register */
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export interface RegisterResponse {
  status: number;
  error: string[];
}

/** Login */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  accessToken: string;
  refreshToken: string;
}

/** Refresh token */
export interface RefreshTokenRequest {
  refreshToken: string;
  userId: string;
}

export interface RefreshTokenResponse {
  status: number;
  error: string[];
  accessToken: string;
  refreshToken: string;
}

/** Send verification email */
export interface SendVerificationEmailRequest {
  email: string;
}

export interface SendVerificationEmailResponse {
  status: number;
  error: string[];
}

/** Forgot password */
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  status: number;
  error: string[];
}

/** Reset password */
export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
  status: number;
  error: string[];
}

/** Validate */
export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: string;
  role: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  refreshToken(request: RefreshTokenRequest): Observable<RefreshTokenResponse>;

  sendVerificationEmail(request: SendVerificationEmailRequest): Observable<SendVerificationEmailResponse>;

  forgotPassword(request: ForgotPasswordRequest): Observable<ForgotPasswordResponse>;

  resetPassword(request: ResetPasswordRequest): Observable<ResetPasswordResponse>;
}

export interface AuthServiceController {
  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;

  refreshToken(
    request: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> | Observable<RefreshTokenResponse> | RefreshTokenResponse;

  sendVerificationEmail(
    request: SendVerificationEmailRequest,
  ): Promise<SendVerificationEmailResponse> | Observable<SendVerificationEmailResponse> | SendVerificationEmailResponse;

  forgotPassword(
    request: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> | Observable<ForgotPasswordResponse> | ForgotPasswordResponse;

  resetPassword(
    request: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> | Observable<ResetPasswordResponse> | ResetPasswordResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "register",
      "login",
      "validate",
      "refreshToken",
      "sendVerificationEmail",
      "forgotPassword",
      "resetPassword",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
