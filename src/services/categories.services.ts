import { CategoriesRepository } from './../database/repositories/categories.repositories';
import { Category } from '../entities/category.intity';

export class CategoriesServices {
  constructor(private CategoriesRepository: CategoriesRepository) {}

  async create(): Promise<Category> {
    const category = new Category({
      title: 'Example Category',
      color: '#ff33bb',
    });

    const createdCategory = await this.CategoriesRepository.create(category);

    return createdCategory;
  }
}
