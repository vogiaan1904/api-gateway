"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const microservices_1 = require("@nestjs/microservices");
const auth_pb_1 = require("./auth.pb");
const config_1 = require("@nestjs/config");
const grpc_js_1 = require("@grpc/grpc-js");
const grpc_logging_interceptor_1 = require("../../interceptors/grpc-logging.interceptor");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.registerAsync([
                {
                    name: auth_pb_1.AUTH_SERVICE_NAME,
                    useFactory: async (configService) => ({
                        transport: microservices_1.Transport.GRPC,
                        options: {
                            url: '0.0.0.0:50051',
                            package: auth_pb_1.AUTH_PACKAGE_NAME,
                            protoPath: 'node_modules/grpc-nest-proto/proto/auth.proto',
                            channelOptions: {
                                interceptors: [
                                    (options, nextCall) => {
                                        const logger = new common_1.Logger(AuthModule.name);
                                        const redactedFields = configService.get('logger.redact.fields') || [];
                                        const path = options.method_definition.path;
                                        logger.verbose('----------- GRPC CALL ------------');
                                        const interceptingCall = new grpc_js_1.InterceptingCall(nextCall(options), (0, grpc_logging_interceptor_1.GrpcLoggingInterceptor)(path, redactedFields));
                                        return interceptingCall;
                                    },
                                ],
                            },
                        },
                    }),
                    inject: [config_1.ConfigService],
                },
            ]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map