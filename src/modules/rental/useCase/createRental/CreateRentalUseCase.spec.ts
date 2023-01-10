import { CreateRentalUseCase } from './CreateRentalUseCase'
import { RentalRepositoryMock } from '../../repositories/implementations/mock/RentalRepositoryMock'

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryMock: RentalRepositoryMock;
describe('Create rental', ()=>{
  beforeEach(()=>{
    rentalRepositoryMock = new RentalRepositoryMock()
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryMock)
  })

  it('Should be able create a new car', async ()=>{
    await createRentalUseCase.execute({
      carId: '1231',
      expectedReturnDate: new Date(),
      userId: '123456'
    })
  })
})