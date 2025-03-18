"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const microservices_1 = require("@nestjs/microservices");
const user_pb_1 = require("./user.pb");
const path_1 = require("path");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: user_pb_1.USER_SERVICE_NAME,
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        url: '0.0.0.0:50052',
                        package: user_pb_1.USER_PACKAGE_NAME,
                        protoPath: (0, path_1.join)('node_modules/grpc-nest-proto/proto/user.proto'),
                    },
                },
            ]),
        ],
        controllers: [user_controller_1.UserController],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map