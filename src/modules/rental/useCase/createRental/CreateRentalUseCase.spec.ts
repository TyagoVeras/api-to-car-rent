import 'reflect-metadata';

import dayjs = require('dayjs');
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { RentalRepositoryMock } from '../../repositories/implementations/mock/RentalRepositoryMock';
import AppError from '../../../../shareds/appError/AppError';
import { DayjsDateProvider } from '../../../../shareds/container/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryMock } from '../../../cars/repositories/implementations/mock/CarsRepositoryMock';

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryMock: RentalRepositoryMock;
let dayjsDateProvider: DayjsDateProvider;
let carRepositoryMock: CarsRepositoryMock;
describe('Create rental', () => {
  const date = dayjs(new Date()).add(1, 'day').toDate();

  beforeEach(() => {
    rentalRepositoryMock = new RentalRepositoryMock();
    dayjsDateProvider = new DayjsDateProvider();
    carRepositoryMock = new CarsRepositoryMock();
    // eslint-disable-next-line max-len
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryMock, dayjsDateProvider, carRepositoryMock);
  });

  it('Should be able create a new retal car', async () => {
    const rental = await createRentalUseCase.execute({
      carId: '1231',
      expectedReturnDate: date,
      userId: '123456',
    });
    expect(rental).toHaveProperty('id');
  });

  it('Should not be able create a new retal car where car alredy exist rental open', async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        carId: '1231',
        expectedReturnDate: date,
        userId: '123456',
      });
      const rental2 = await createRentalUseCase.execute({
        carId: '1231',
        expectedReturnDate: date,
        userId: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able create a new retal car where car with invalid return time', async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        carId: '1231',
        expectedReturnDate: dayjs().toDate(),
        userId: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
