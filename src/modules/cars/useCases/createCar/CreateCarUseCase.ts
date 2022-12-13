import { Cars } from "@prisma/client";
import { inject, injectable } from "tsyringe"
import AppError from "../../../../shareds/appError/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
    name: string
    description: string
    daily_rate: number
    available: boolean
    license_plate: string
    fine_amount: number
    brand: string
    category_id: string

}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject('CarsRepository')
        private carRepository: ICarsRepository) { }

    async execute({ name,
        description,
        daily_rate,
        available,
        license_plate,
        fine_amount,
        brand,
        category_id }: IRequest): Promise<Cars> {
        
            const carAlreadyExists = await this.carRepository.findByLicensePlate(license_plate);
            if(carAlreadyExists){
                throw new AppError('Car alredy exists')
            }
        return await this.carRepository.create({ available, brand, category_id, daily_rate, description, fine_amount, license_plate, name})
    }
}

export { CreateCarUseCase }