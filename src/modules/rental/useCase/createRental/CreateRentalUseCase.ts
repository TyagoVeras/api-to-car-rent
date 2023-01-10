import AppError from "../../../../shareds/appError/AppError";
import { IRentalRepository } from "../../repositories/IRentalRepository"
interface IRequest {
  carId: string;
  userId: string;
  expectedReturnDate: Date;
}

class CreateRentalUseCase {

  constructor(
    private rentalRepository: IRentalRepository
  ){}

  async execute({ carId, expectedReturnDate, userId }: IRequest): Promise<void>{
    const carIsRented = await this.rentalRepository.findCarRentedByCar(carId);
    if(carIsRented){
      throw new AppError('Car is rented')
    }

    const userHasOpenRent = await this.rentalRepository.findRentalOpenByUser(userId)
    if(userHasOpenRent){
      throw new AppError('User has open rent')
    }

    
  }
}

export { CreateRentalUseCase }