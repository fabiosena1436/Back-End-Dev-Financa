import { CategoriesRepository } from './../database/repositories/categories.repositories';
import { Category } from '../entities/category.intity';
import { CreateCategoyDTO } from '../dtos/categories.dto';

export class CategoriesServices {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async create({ title, color }: CreateCategoyDTO): Promise<Category> {
    const foundCategory = await this.categoriesRepository.findByTitle(title);

    if (foundCategory) {
      throw new Error('Category already exist.');
    }
    const category = new Category({
      title,
      color,
    });

    const createdCategory = await this.categoriesRepository.create(category);

    return createdCategory;
  }
}
