import { CreateRentalUseCase } from './CreateRentalUseCase'
import { RentalRepositoryMock } from '../../repositories/implementations/mock/RentalRepositoryMock'
import AppError from '../../../../shareds/appError/AppError';
import dayjs = require('dayjs');

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryMock: RentalRepositoryMock;
describe('Create rental', ()=>{
  const date = dayjs(new Date()).add(1, 'day').toDate()

  beforeEach(()=>{
    rentalRepositoryMock = new RentalRepositoryMock()
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryMock)
  })

  it('Should be able create a new retal car', async ()=>{
    const rental = await createRentalUseCase.execute({
      carId: '1231',
      expectedReturnDate: date,
      userId: '123456'
    });
    expect(rental).toHaveProperty('id')
  });

  it('Should not be able create a new retal car where car alredy exist rental open', async ()=>{
    expect(async ()=> {
      const rental = await createRentalUseCase.execute({
        carId: '1231',
        expectedReturnDate: date,
        userId: '123456'
      });
      const rental2 = await createRentalUseCase.execute({
        carId: '1231',
        expectedReturnDate: date,
        userId: '123456'
      });
    }).rejects.toBeInstanceOf(AppError)
  });




})