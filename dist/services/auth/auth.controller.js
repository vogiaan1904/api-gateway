"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_pb_1 = require("./auth.pb");
const jwt_access_guard_1 = require("./guards/jwt-access.guard");
let AuthController = class AuthController {
    onModuleInit() {
        this.svc = this.client.getService(auth_pb_1.AUTH_SERVICE_NAME);
    }
    async register(body) {
        return this.svc.register(body);
    }
    async login(body) {
        return this.svc.login(body);
    }
    async refreshToken(request, body) {
        const userId = request.user.id;
        const payload = {
            refreshToken: body.refreshToken,
            userId,
        };
        return this.svc.refreshToken(payload);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Inject)(auth_pb_1.AUTH_SERVICE_NAME),
    __metadata("design:type", Object)
], AuthController.prototype, "client", void 0);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessTokenGuard),
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth')
], AuthController);
//# sourceMappingURL=auth.controller.js.map