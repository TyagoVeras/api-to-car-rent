import { inject, injectable } from 'tsyringe';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

@injectable()
class ListSpecificationUseCase {
  constructor(
        @inject('SpecificationsRepository')
        private specificatonRepository: ISpecificationRepository,
  ) {}

  async execute() {
    const specifications = await this.specificatonRepository.list();
    return specifications;
  }
}

export { ListSpecificationUseCase };
