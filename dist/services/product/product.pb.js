"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT_SERVICE_NAME = exports.PRODUCT_PACKAGE_NAME = exports.protobufPackage = void 0;
exports.ProductServiceControllerMethods = ProductServiceControllerMethods;
const microservices_1 = require("@nestjs/microservices");
exports.protobufPackage = "product";
exports.PRODUCT_PACKAGE_NAME = "product";
function ProductServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = ["createProduct", "findOne", "decreaseStock"];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("ProductService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("ProductService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.PRODUCT_SERVICE_NAME = "ProductService";
//# sourceMappingURL=product.pb.js.map