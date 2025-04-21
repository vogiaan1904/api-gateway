import { Logger, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE_NAME, ORDER_PACKAGE_NAME } from './protos/order.pb';
import { OrderController } from './order.controller';
import { config } from 'process';
import { ConfigService } from '@nestjs/config';
import { InterceptingCall } from '@grpc/grpc-js';
import { GrpcLoggingInterceptor } from 'src/interceptors/grpc-logging.interceptor';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ORDER_SERVICE_NAME,
        useFactory: async (ConfigService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: '0.0.0.0:50054',
            package: ORDER_PACKAGE_NAME,
            protoPath: 'node_modules/grpc-nest-proto/proto/order.proto',
            channelOptions: {
              interceptors: [
                (options, nextCall) => {
                  const logger = new Logger(OrderModule.name);

                  const redactedFields =
                    ConfigService.get<string[]>('logger.redact.fields') || [];
                  const path: string = options.method_definition.path;

                  logger.verbose('-- GRPC CALL --');

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
  controllers: [OrderController],
})
export class OrderModule {}
