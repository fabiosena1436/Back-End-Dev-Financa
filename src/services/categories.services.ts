import { Category } from '../entities/category.intity';

export class CategoriesServices {
  async create(): Promise<Category> {
    const category = new Category({
      title: 'Example Category',
      color: '#ff33bb',
    });
    return category;
  }
}
