import { container } from 'tsyringe';
import { IUsersRepository } from '../../../modules/accounts/repositories/IUsersRepository';
import { ICategoriesRepository } from '../../../modules/cars/repositories/ICategoryRepository';
import { ISpecificationRepository } from '../../../modules/cars/repositories/ISpecificationRepository';

import { CategoriesPostgresRepository } from '../../../modules/cars/repositories/implementations/postgres/CategoriesPostgresRepository';
import { SpecificationsPostgresRepository } from '../../../modules/cars/repositories/implementations/postgres/SpecificationsPostgresRepository';
import { UsersPostgresRepository } from '../../../modules/accounts/repositories/implementations/postgres/UsersPostgresRespository';
import { ICarsRepository } from '../../../modules/cars/repositories/ICarsRepository';
import { CarPostgresRepository } from '../../../modules/cars/repositories/implementations/postgres/CarPostgresRepository';
import { IcarImageRepository } from '../../../modules/cars/repositories/ICarsImageRepository';
import { CarImageRepository } from '../../../modules/cars/repositories/implementations/postgres/CarImageRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesPostgresRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationsRepository',
  SpecificationsPostgresRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersPostgresRepository,
);

container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarPostgresRepository
)

container.registerSingleton<IcarImageRepository>(
  'CarImageRepository', 
  CarImageRepository
)