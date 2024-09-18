"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = require("express");
const categories_dto_1 = require("./../dtos/categories.dto");
const category_controller_1 = require("../controller/category.controller");
const validetor_middleware_1 = require("../middlewares/validetor.middleware");
const categories_factory_1 = require("../factories/categories.factory");
exports.categoriesRoutes = (0, express_1.Router)();
const controller = new category_controller_1.CategoriesController(categories_factory_1.CategoriesFactory.getServiceInstance());
exports.categoriesRoutes.get('/', controller.index);
exports.categoriesRoutes.post('/', (0, validetor_middleware_1.validator)({
    schema: categories_dto_1.createCtegorySchema,
    type: validetor_middleware_1.ParamnsType.BODY
}), controller.create);
