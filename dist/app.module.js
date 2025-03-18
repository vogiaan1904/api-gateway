"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./services/auth/auth.module");
const product_module_1 = require("./services/product/product.module");
const order_module_1 = require("./services/order/order.module");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const user_module_1 = require("./services/user/user.module");
const config_1 = require("@nestjs/config");
const logging_config_1 = require("./configs/logging.config");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [logging_config_1.default],
                validationOptions: {
                    abortEarly: false,
                },
                isGlobal: true,
                envFilePath: process.env.NODE_ENV === 'development' ? '.env' : '.env.prod',
                cache: true,
                expandVariables: true,
            }),
            auth_module_1.AuthModule,
            product_module_1.ProductModule,
            order_module_1.OrderModule,
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map