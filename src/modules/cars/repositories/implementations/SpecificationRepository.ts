import Specification from '../../models/Specification';
import { ICreateSpecificationDTO, ISpecificationRepository } from '../ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  private constructor() {
    this.specifications = [];
  }

  private static INSTANCE: SpecificationRepository;

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }
    return SpecificationRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
    return specification;
  }

  findByName(name: String): Specification | undefined {
    const specification = this.specifications.find(
      (specificationitem) => specificationitem?.name === name,
    );
    return specification;
  }
}

export { SpecificationRepository };
