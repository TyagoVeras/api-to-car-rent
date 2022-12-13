import Category from '../../models/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoryRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private constructor() {
    this.categories = [];
  }

  private static INSTANCE: CategoriesRepository;

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  async create({ name, description } : ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const categoryAlreadExists = this.categories.find((categroy) => categroy.name === name);
    return categoryAlreadExists;
  }
}

export { CategoriesRepository };
