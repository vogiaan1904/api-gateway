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
exports.JwtAccessTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
let JwtAccessTokenGuard = class JwtAccessTokenGuard {
    constructor(service) {
        this.service = service;
    }
    async canActivate(ctx) {
        const req = ctx.switchToHttp().getRequest();
        const authorization = req.headers['authorization'];
        if (!authorization) {
            throw new common_1.UnauthorizedException();
        }
        const parts = authorization.split(' ');
        if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
            throw new common_1.UnauthorizedException('Malformed authorization header');
        }
        const token = parts[1];
        const { status, userId } = await this.service.validate(token);
        if (status !== Number(common_1.HttpStatus.OK)) {
            throw new common_1.UnauthorizedException();
        }
        req.user = { id: userId };
        return true;
    }
};
exports.JwtAccessTokenGuard = JwtAccessTokenGuard;
exports.JwtAccessTokenGuard = JwtAccessTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_service_1.AuthService)),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], JwtAccessTokenGuard);
//# sourceMappingURL=jwt-access.guard.js.map