"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepository = void 0;
class CategoriesRepository {
    constructor(model) {
        this.model = model;
    }
    async create({ title, color }) {
        const createdCategory = await this.model.create({ title, color });
        return createdCategory.toObject();
    }
    async findByTitle(title) {
        const category = await this.model.findOne({ title });
        return category?.toObject();
    }
}
exports.CategoriesRepository = CategoriesRepository;
