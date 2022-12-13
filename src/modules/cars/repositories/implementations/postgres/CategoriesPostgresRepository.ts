import { Category } from '@prisma/client';
import prisma from '../../../../../services/database/prismaClient';
import { ICategoriesRepository, ICreateCategoryDTO } from '../../ICategoryRepository';

class CategoriesPostgresRepository implements ICategoriesRepository {
  async findByName(name: string): Promise<Category | null> {
    const result = await prisma.category.findFirst({
      where: {
        name,
      },
    });

    return result;
  }

  async list(): Promise<Category[]> {
    const categories = await prisma.category.findMany();
    return categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const result = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    return result;
  }
}

export { CategoriesPostgresRepository };
