import { Rentals } from "@prisma/client";
import AppError from "../../../../shareds/appError/AppError";
import { IRentalRepository, ICreateRentalDTO } from "../../repositories/IRentalRepository"
import { IDateProvider } from "../../../../shareds/container/DateProvider/IDateProvider"
import { inject, injectable } from "tsyringe";
interface IRequest {
  carId: string;
  userId: string;
  expectedReturnDate: Date;
}

@injectable()
class CreateRentalUseCase {

  constructor(
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository,

    @inject('DataProvider')
    private dateProvider: IDateProvider
  ){}


  async execute({ carId, expectedReturnDate, userId }: IRequest): Promise<Rentals>{ 

    const minimumHour = 24;
    const carIsRented = await this.rentalRepository.findCarRentedByCar(carId);
    if(carIsRented){
      throw new AppError('Car is rented')
    }

    const userHasOpenRent = await this.rentalRepository.findRentalOpenByUser(userId)
    if(userHasOpenRent){
      throw new AppError('User has open rent')
    }

    const compare = this.dateProvider.compareInHours(expectedReturnDate, new Date())

    if(compare < minimumHour) {
      throw new AppError('Invalid return date')
    }    
    
    const rental = await this.rentalRepository.create({
      userId,
      carId,
      expectedReturnDate
    })

    return rental;
    
  }
}

export { CreateRentalUseCase }