import { Specification } from '@prisma/client';
import prisma from '../../../../../services/database/prismaClient';
import { ISpecificationRepository, ICreateSpecificationDTO } from '../../ISpecificationRepository';

class SpecificationsPostgresRepository implements ISpecificationRepository {
  async findByIds(ids: string[]): Promise<Specification[] | null> {
    return await prisma.specification.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }
  
  async findByName(name: string): Promise<Specification | null> {
    const result = await prisma.specification.findFirst({
      where: {
        name,
      },
    });

    return result;
  }

  async list(): Promise<Specification[]> {
    const categories = await prisma.specification.findMany();
    return categories;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const result = await prisma.specification.create({
      data: {
        name,
        description,
      },
    });
    return result;
  }
}

export { SpecificationsPostgresRepository };
