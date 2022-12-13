import { inject, injectable } from 'tsyringe';
import AppError from '../../../../shareds/appError/AppError';

import { ICategoriesRepository } from '../../repositories/ICategoryRepository';

interface IRequest{
    name: string;
    description: string
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadExists = await this.categoriesRepository.findByName(name);
    if (categoryAlreadExists) {
      throw new AppError('Category alread exists');
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
