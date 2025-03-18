"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const configs_1 = require("../configs");
const common_1 = require("@nestjs/common");
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        const { method, originalUrl, ip } = req;
        const userAgent = req.get('user-agent') || '';
        configs_1.logger.info(`Incoming ${method} ${originalUrl}`, {
            context: 'HTTP',
            ip,
            userAgent,
            body: req.body,
            params: req.params,
            query: req.query,
        });
        const start = Date.now();
        res.on('finish', () => {
            const duration = Date.now() - start;
            configs_1.logger.log(res.statusCode >= 400 ? 'error' : 'info', `${method} ${originalUrl} ${res.statusCode} - ${duration}ms`, {
                context: 'HTTP',
            });
        });
        next();
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map