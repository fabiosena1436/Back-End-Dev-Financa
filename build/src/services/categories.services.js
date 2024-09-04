"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesServices = void 0;
const category_intity_1 = require("../entities/category.intity");
const app_errors_1 = require("../errors/app.errors");
const http_status_codes_1 = require("http-status-codes");
class CategoriesServices {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async create({ title, color }) {
        const foundCategory = await this.categoriesRepository.findByTitle(title);
        if (foundCategory) {
            throw new app_errors_1.AppError('Category already exist.', http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const category = new category_intity_1.Category({
            title,
            color,
        });
        const createdCategory = await this.categoriesRepository.create(category);
        return createdCategory;
    }
}
exports.CategoriesServices = CategoriesServices;
