import { inject, injectable } from "tsyringe";
import { IcarImageRepository } from "../../repositories/ICarsImageRepository";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import AppError from "../../../../shareds/appError/AppError";

interface IRequest {
  carId: string;
  imagesPath: string[];
}
@injectable()
class UploadCarImageUseCase { 

  constructor(
    @inject('CarImageRepository')
    private carImageRepository: IcarImageRepository,
    private carRepository: ICarsRepository
  ){}
  async execute({ carId, imagesPath }: IRequest): Promise<void>{

    const carExist = this.carRepository.findById(carId);

    if(!carExist){
      throw new AppError('Car not exists')
    }

  const imagesPathLength = imagesPath.length;
   for(let i = 0; i <= imagesPathLength; i++){
    await this.carImageRepository.create({ carId, imagePath: imagesPath[i]})
   }   
  }
}
export { UploadCarImageUseCase }