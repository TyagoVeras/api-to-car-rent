import "reflect-metadata"
import AppError from "../../../../shareds/appError/AppError";
import { CarsRepositoryMock } from "../../repositories/implementations/mock/CarsRepositoryMock";

import { CreateCarUseCase } from "./CreateCarUseCase"

describe('Create car', () => {
    
    let createCarUseCase: CreateCarUseCase;
    let carsRepositoryMock: CarsRepositoryMock;
    
    beforeEach(()=> {
        carsRepositoryMock = new CarsRepositoryMock();
        createCarUseCase = new CreateCarUseCase(carsRepositoryMock)

    })
    
    it('Should be able create a new car', async ()=> {
        const car = await createCarUseCase.execute({
            name: 'Tyago',
            description: 'Description car',
            daily_rate: 12,
            fine_amount: 23,
            brand: 'Brand',
            category_id: 'category',
            license_plate: 'ABC-1234',
            available: true
        });

        expect(car).toHaveProperty('id');
    })

    it('Not should be able create a car with same license plat', ()=>{
        expect( async ()=>{
            await createCarUseCase.execute({
                name: 'Tyago',
                description: 'Description car',
                daily_rate: 12,
                fine_amount: 23,
                brand: 'Brand',
                category_id: 'category',
                license_plate: 'ABC-1234',
                available: true
            })
            await createCarUseCase.execute({
                name: 'Tyago',
                description: 'Description car',
                daily_rate: 12,
                fine_amount: 23,
                brand: 'Brand',
                category_id: 'category',
                license_plate: 'ABC-1234',
                available: true
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('Sould be able to hire a car with availabe true', async ()=>{
        const car = await createCarUseCase.execute({
            name: 'Tyago',
            description: 'Description car',
            daily_rate: 12,
            fine_amount: 23,
            brand: 'Brand',
            category_id: 'category',
            license_plate: 'ABC-1234',
            available: true
        });

        expect(car.available).toBe(true)
    })
})