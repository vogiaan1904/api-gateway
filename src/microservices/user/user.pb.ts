// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v5.29.3
// source: user.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty.pb";

export const protobufPackage = "user";

export enum ErrorCode {
  OK = 0,
  USER_NOT_FOUND = 200100,
  USER_ALREADY_EXISTS = 200101,
  INVALID_USER_DATA = 200102,
  USER_DELETED = 200103,
  USER_INACTIVE = 200104,
  USER_SUSPENDED = 200105,
  USER_BLOCKED = 200106,
  UNRECOGNIZED = -1,
}

export interface Error {
  code: ErrorCode;
  message: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  avatar: string;
  addresses: Address[];
  password: string;
  role: string;
}

/** CreateUser */
export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  role: string;
}

export interface CreateUserResponse {
  error: Error | undefined;
  id: string;
}

/** FindOne */
export interface FindOneRequest {
  id?: string | undefined;
  email?: string | undefined;
}

export interface FindOneResponse {
  error: Error | undefined;
  data: UserData | undefined;
}

/** FindAll */
export interface FindAllResponse {
  error: Error | undefined;
  data: UserData[];
}

/** Update user */
export interface UpdateUserRequest {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
}

export interface UpdateUserResponse {
  error: Error | undefined;
}

/** Delete user */
export interface DeleteUserRequest {
  id: string;
}

export interface DeleteUserResponse {
  error: Error | undefined;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;

  findOne(request: FindOneRequest): Observable<FindOneResponse>;

  findAll(request: Empty): Observable<FindAllResponse>;

  updateUser(request: UpdateUserRequest): Observable<UpdateUserResponse>;

  deleteUser(request: DeleteUserRequest): Observable<DeleteUserResponse>;
}

export interface UserServiceController {
  createUser(
    request: CreateUserRequest,
  ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;

  findOne(request: FindOneRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  findAll(request: Empty): Promise<FindAllResponse> | Observable<FindAllResponse> | FindAllResponse;

  updateUser(
    request: UpdateUserRequest,
  ): Promise<UpdateUserResponse> | Observable<UpdateUserResponse> | UpdateUserResponse;

  deleteUser(
    request: DeleteUserRequest,
  ): Promise<DeleteUserResponse> | Observable<DeleteUserResponse> | DeleteUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "findOne", "findAll", "updateUser", "deleteUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
