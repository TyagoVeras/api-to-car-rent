import { Specification } from '@prisma/client';
import { ICreateSpecificationDTO, ISpecificationRepository } from '../../ISpecificationRepository'

class SpecificationRepositoryMock implements ISpecificationRepository{

  specifications: Specification[] = []

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    
    const specification = Object.assign({}, {
      id: Math.random().toString(16),
      name,
      description,
      created_at: new Date()
    }) as Specification;

    this.specifications.push(specification)
    return specification;
  }
  async findByName(name: string): Promise<Specification | null> {
    return this.specifications.find(specification => specification.name === name) || null;
  }
  async list(): Promise<Specification[] | []> {
    return this.specifications;
  }
  async findByIds(ids: string[]): Promise<Specification[] | null> {
    return this.specifications.filter( specification => ids.includes(specification.id))
  }

}

export { SpecificationRepositoryMock }