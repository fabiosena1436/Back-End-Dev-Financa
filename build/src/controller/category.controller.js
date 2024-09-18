"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const http_status_codes_1 = require("http-status-codes");
class CategoriesController {
    constructor(catecoriesSevices) {
        this.catecoriesSevices = catecoriesSevices;
        this.create = async (req, res, next) => {
            try {
                const { color, title } = req.body;
                const result = await this.catecoriesSevices.create({ color, title });
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
            }
            catch (err) {
                next(err);
            }
        };
        this.index = async (_, res, next) => {
            try {
                const result = await this.catecoriesSevices.index();
                return res.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.CategoriesController = CategoriesController;
