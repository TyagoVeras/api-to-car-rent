import { inject, injectable } from 'tsyringe';
import AppError from '../../../../shareds/appError/AppError';
import Specification from '../../models/Specification';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists');
    }

    const specification = await this.specificationRepository.create({ name, description });

    return specification;
  }
}

export { CreateSpecificationUseCase };
