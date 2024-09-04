"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoiresRouter = void 0;
const express_1 = require("express");
const category_controller_1 = require("../controller/category.controller");
exports.categoiresRouter = (0, express_1.Router)();
const controller = new category_controller_1.CategoriesController();
exports.categoiresRouter.post('/', controller.create);
