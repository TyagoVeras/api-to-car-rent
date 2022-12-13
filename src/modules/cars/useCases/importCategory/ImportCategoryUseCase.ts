import fs from 'fs';
import { parse as csvParse } from 'csv-parse';
import { inject, injectable } from 'tsyringe';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRespository';
import AppError from '../../../../shareds/appError/AppError';

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: CategoriesRepository,
  ) {}

  async loadCategories(file: Express.Multer.File | undefined): Promise<IImportCategory[]> {
    if (!file) {
      return [];
    }
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile.on('data', async (line) => {
        const [name, description] = line;
        categories.push({
          name,
          description,
        });
      }).on('end', () => {
        fs.promises.unlink(file.path);
        resolve(categories);
      }).on('error', (error) => {
        reject(error);
      });
    });
  }

  async execute(file : Express.Multer.File | undefined) {
    const categories = await this.loadCategories(file);

    try {
      categories.forEach(async (category) => {
        const { name, description } = category;
        const categoryAlreadExists = await this.categoryRepository.findByName(name);
        if (!categoryAlreadExists) {
          await this.categoryRepository.create({ name, description });
        }
      });
    } catch (error) {
      throw new AppError('Erro to import file', 500);
    }
  }
}

export { ImportCategoryUseCase };
