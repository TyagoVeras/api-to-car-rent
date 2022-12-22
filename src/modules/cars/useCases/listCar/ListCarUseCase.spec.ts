import {ListCarUseCase} from './ListCarUseCase'
import { CarsRepositoryMock } from '../../repositories/implementations/mock/CarsRepositoryMock'
let listCarUseCase: ListCarUseCase;
let carRepositoryMock: CarsRepositoryMock;
describe("List cars", ()=>{

  beforeEach(()=>{
    carRepositoryMock = new CarsRepositoryMock()
    listCarUseCase = new ListCarUseCase(carRepositoryMock)
  })

  it("Should be able list all cars available", async ()=>{
    carRepositoryMock.create({
      available: true,
      brand: 'asdf',
      category_id: 'a;slkdfj',
      daily_rate:32,
      description: 'a;sldkf',
      fine_amount: 4234,
      license_plate: 'asdfa',
      name: 'asdfad'
    })
   const cars =  await listCarUseCase.execute({});
   let carExists
   if(cars?.length){
    carExists = cars[0]
   }
   
   expect(carExists).toHaveProperty('id')
  })

  it("SHould be able to list all available cars by name", ()=>{
    
  })
})