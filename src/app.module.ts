import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './services/auth/auth.module';
import { ProductModule } from './services/product/product.module';
import { OrderModule } from './services/order/order.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UserModule } from './services/user/user.module';
import { ConfigModule } from '@nestjs/config';
import loggingConfig from './configs/logging.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loggingConfig],
      validationOptions: {
        abortEarly: false,
      },
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env' : '.env.prod',
      cache: true,
      expandVariables: true,
    }),
    AuthModule,
    ProductModule,
    OrderModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
