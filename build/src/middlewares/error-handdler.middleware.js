"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const app_errors_1 = require("../errors/app.errors");
const http_status_codes_1 = require("http-status-codes");
function errorHandler(error, _, res, __) {
    if (error instanceof app_errors_1.AppError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
    });
}
