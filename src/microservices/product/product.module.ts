import { Logger, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductController } from './product.controller';
import {
  PRODUCT_PACKAGE_NAME,
  PRODUCT_SERVICE_NAME,
} from './protos/product.pb';
import { ConfigService } from '@nestjs/config';
import { GrpcLoggingInterceptor } from 'src/interceptors/grpc-logging.interceptor';
import { InterceptingCall } from '@grpc/grpc-js';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PRODUCT_SERVICE_NAME,
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: '0.0.0.0:50053',
            package: PRODUCT_PACKAGE_NAME,
            protoPath: 'node_modules/grpc-nest-proto/proto/product.proto',
            channelOptions: {
              interceptors: [
                (options, nextCall) => {
                  const logger: Logger = new Logger(ProductModule.name);

                  const redactedFields: string[] =
                    configService.get<string[]>('logger.redact.fields') || [];
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
  controllers: [ProductController],
})
export class ProductModule {}
