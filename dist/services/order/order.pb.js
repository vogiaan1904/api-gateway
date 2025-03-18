"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_SERVICE_NAME = exports.ORDER_PACKAGE_NAME = exports.protobufPackage = void 0;
exports.OrderServiceControllerMethods = OrderServiceControllerMethods;
const microservices_1 = require("@nestjs/microservices");
exports.protobufPackage = "order";
exports.ORDER_PACKAGE_NAME = "order";
function OrderServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = ["createOrder", "findOne"];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("OrderService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("OrderService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.ORDER_SERVICE_NAME = "OrderService";
//# sourceMappingURL=order.pb.js.map