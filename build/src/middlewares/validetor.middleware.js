"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamnsType = void 0;
exports.validator = validator;
const zod_1 = require("zod");
var ParamnsType;
(function (ParamnsType) {
    ParamnsType["QUERY"] = "query";
    ParamnsType["BODY"] = "body";
})(ParamnsType || (exports.ParamnsType = ParamnsType = {}));
function validator(params) {
    return (req, res, next) => {
        const result = zod_1.z.object(params.schema).safeParse(req[params.type]);
    };
}
