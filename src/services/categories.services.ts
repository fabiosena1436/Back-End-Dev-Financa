import { CategoriesRepository } from './../database/repositories/categories.repositories';
import { Category } from '../entities/category.intity';
import { CreateCategoyDTO } from '../dtos/categories.dto';

export class CategoriesServices {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async create({ title, color }: CreateCategoyDTO): Promise<Category> {
    
    const category = new Category({
      title,
      color,
    });

    const createdCategory = await this.categoriesRepository.create(category);

    return createdCategory;
  }
}
