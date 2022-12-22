import "reflect-metadata"
import { Cars } from "@prisma/client";
import { inject, injectable } from "tsyringe"
import AppError from "../../../../shareds/appError/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  brand?: string;
  name?: string;
  category_id?: string;
}

@injectable()
class ListCarUseCase{
  
  constructor(
    @inject('CarsRepository')
    private carRepository: ICarsRepository
   ){}

  async execute({brand, name, category_id}: IRequest): Promise<Cars[] | null>{
    const cars = await this.carRepository.findAvailable({brand, name, category_id});    
    return cars;
  }
}

export { ListCarUseCase }