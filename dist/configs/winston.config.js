"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const path = require("path");
const fs = require("fs");
require("winston-daily-rotate-file");
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const logFormat = winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.colorize({ all: true }), winston_1.format.errors({ stack: true }), winston_1.format.printf(({ timestamp, level, message, context }) => {
    const contextMessage = context ? ` [${context}]` : '';
    return `${timestamp} ${level}:${contextMessage} ${message}`;
}));
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: logFormat,
    transports: [
        new winston_1.transports.Console({
            format: logFormat,
        }),
        new winston_1.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error',
        }),
        new winston_1.transports.DailyRotateFile({
            filename: path.join(logDir, 'application-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d',
            maxSize: '20m',
        }),
    ],
    exitOnError: false,
});
//# sourceMappingURL=winston.config.js.map