import { Global, Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from './auth.pb';
import { ConfigService } from '@nestjs/config';
import { InterceptingCall } from '@grpc/grpc-js';
import { GrpcLoggingInterceptor } from 'src/interceptors/grpc-logging.interceptor';
@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: '127.0.0.1:50051',
            package: AUTH_PACKAGE_NAME,
            protoPath: 'node_modules/grpc-nest-proto/proto/auth.proto',
            channelOptions: {
              interceptors: [
                (options, nextCall) => {
                  const logger: Logger = new Logger(AuthModule.name);

                  const redactedFields: string[] =
                    configService.get<string[]>('logger.redact.fields') || [];
                  const path: string = options.method_definition.path;

                  logger.verbose('----------- GRPC CALL ------------');

                  const interceptingCall = new InterceptingCall(
                    nextCall(options),
                    GrpcLoggingInterceptor(path, redactedFields),
                  );

                  return interceptingCall;
                },
              ],
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
