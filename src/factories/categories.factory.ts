import { CategoriesRepository } from "../database/repositories/categories.repository";
import { CategoryModel } from "../database/schemas/category.schema";
import { CategoriesServices } from "../services/categories.service";

export class CategoriesFactory {
    private static categoriesSevice: CategoriesServices

    static getServiceInstance() {
        if (this.categoriesSevice) {
            return this.categoriesSevice
        }

        const repository = new CategoriesRepository(CategoryModel)
        const service = new CategoriesServices(repository)

        this.categoriesSevice = service

        return service
    }
}