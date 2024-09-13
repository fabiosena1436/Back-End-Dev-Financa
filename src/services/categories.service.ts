import { CategoriesRepository } from '../database/repositories/categories.repository';
import { Category } from '../entities/category.entity';
import { CreateCategoyDTO } from '../dtos/categories.dto';
import { AppError } from '../errors/app.errors';
import { StatusCodes } from 'http-status-codes';

export class CategoriesServices {
  constructor(private categoriesRepository: CategoriesRepository) { }

  async create({ title, color }: CreateCategoyDTO): Promise<Category> {
    const foundCategory = await this.categoriesRepository.findByTitle(title);

    if (foundCategory) {
      throw new AppError('Category already exist.', StatusCodes.BAD_REQUEST);
    }
    const category = new Category({
      title,
      color,
    });

    const createdCategory = await this.categoriesRepository.create(category);

    return createdCategory;
  }

  async index(): Promise<Category[]> {
    const categories = await this.categoriesRepository.index()

    return categories
  }
}
