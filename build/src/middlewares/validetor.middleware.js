"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamnsType = void 0;
exports.validator = validator;
const http_status_codes_1 = require("http-status-codes");
const app_errors_1 = require("./../errors/app.errors");
const zod_1 = require("zod");
var ParamnsType;
(function (ParamnsType) {
    ParamnsType["QUERY"] = "query";
    ParamnsType["BODY"] = "body";
})(ParamnsType || (exports.ParamnsType = ParamnsType = {}));
function validator(params) {
    return (req, res, next) => {
        const result = zod_1.z.object(params.schema).safeParse(req[params.type]);
        if (!result.success) {
            const errorFormatted = result.error.issues.map((item) => `${item.path.join('.')}: ${item.message}`);
            throw new app_errors_1.AppError(errorFormatted, http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
        }
        req[params.type] = result.data;
        next();
    };
}
