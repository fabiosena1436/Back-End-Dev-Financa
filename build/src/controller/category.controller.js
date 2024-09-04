"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const categories_repositories_1 = require("../database/repositories/categories.repositories");
const category_schema_1 = require("../database/schemas/category.schema");
const categories_services_1 = require("./../services/categories.services");
const zod_1 = require("zod");
class CategoriesController {
    async create(req, res, next) {
        try {
            const validateSchema = zod_1.z.object({
                title: zod_1.z.string(),
                color: zod_1.z.string().regex(/^#[A-Fa-f0-9]{6}$/),
            });
            validateSchema.parse(req.body);
            const { color, title } = req.body;
            const respository = new categories_repositories_1.CategoriesRepository(category_schema_1.CategoryModel);
            const service = new categories_services_1.CategoriesServices(respository);
            const result = await service.create({ color, title });
            return res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.CategoriesController = CategoriesController;
