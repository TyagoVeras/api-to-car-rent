import AppError from "../../../../shareds/appError/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { ICarSpecificationRepository } from "../../repositories/ICarSpecificationRepository"

interface IRequest {
  carId: string;
  specificationsId: string[];
}

class CreateCarSpecificationUseCase {

  constructor(
    private carsRepository: ICarsRepository,
    private specificationRepository: ISpecificationRepository,
    private carSpecificationRepository: ICarSpecificationRepository
  ){}

  async execute({ carId, specificationsId}: IRequest): Promise<void>{
    const carExists = await this.carsRepository.findById(carId);
    
    if(!carExists){
      throw new AppError('Car not exists');
    }

    const specifications = await this.specificationRepository.findByIds(specificationsId);

    if(specifications?.length){
      for await (const specification of specifications) {
        this.carSpecificationRepository.create({ specificationId: specification.id, carId: carExists.id })
      }
    }
  }
}

export { CreateCarSpecificationUseCase }