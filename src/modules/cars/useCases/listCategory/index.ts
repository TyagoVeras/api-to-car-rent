import { CategoriesPostgresRepository } from '../../repositories/implementations/postgres/CategoriesPostgresRepository';
import { ListCategoryController } from './ListCategoryController';
import { ListCategoryUseCase } from './ListCategoryUseCase';

const categoryRepository = new CategoriesPostgresRepository();
const listCategoryUseCase = new ListCategoryUseCase(categoryRepository);
const listCategoryController = new ListCategoryController(listCategoryUseCase);

export { listCategoryController };
