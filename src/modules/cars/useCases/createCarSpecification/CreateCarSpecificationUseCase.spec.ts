import { CreateCarSpecificationUseCase } from '../../useCases/createCarSpecification/CreateCarSpecificationUseCase'
import { CarsRepositoryMock } from '../../repositories/implementations/mock/CarsRepositoryMock'
import AppError from '../../../../shareds/appError/AppError';
import { SpecificationRepositoryMock } from '../../repositories/implementations/mock/SpecificationRepositoryMock';
import { CarSpecificationRepositoryMock } from '../../repositories/implementations/mock/CarSpecificationRepositoryMock';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryMock: CarsRepositoryMock;
let specificationMock: SpecificationRepositoryMock;
let carSpecificationMock: CarSpecificationRepositoryMock;

describe("Create car specification", ()=>{

  beforeEach(()=>{
    carRepositoryMock = new CarsRepositoryMock();
    specificationMock = new SpecificationRepositoryMock();
    carSpecificationMock = new CarSpecificationRepositoryMock();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carRepositoryMock, specificationMock, carSpecificationMock)
  })

  it("Should note be able add new car specification if car not exists", async ()=>{
    expect(async()=>{
      const carId = '234234';
    const specificationsId = ['45555'];
    await createCarSpecificationUseCase.execute({ carId, specificationsId})
    }).rejects.toBeInstanceOf(AppError)
  })

  it("Should be able add new car specification", async ()=>{
    const specification = await specificationMock.create({ name: 'teste', description: 'teste description'})
    const specificationsId = [specification.id];
    const car = await carRepositoryMock.create({
      name: 'Tyago',
      description: 'Description car',
      daily_rate: 12,
      fine_amount: 23,
      brand: 'Brand',
      category_id: 'category',
      license_plate: 'ABC-1234',
      available: true
    })
    const specificationCars = await createCarSpecificationUseCase.execute({ carId: car.id, specificationsId})    
  })
})