import AppError from "../../../../shareds/appError/AppError";

import { IRentalRepository } from '../../repositories/IRentalRepository'
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository'
import { IDateProvider } from '../../../../shareds/container/DateProvider/IDateProvider'
import { Rentals } from "@prisma/client";
import { inject, injectable } from "tsyringe";
interface IRequest {
  rentalId: string;
  carId: string;
}

@injectable()
class DevolutionRentalUseCase {

  constructor(
    @inject('rentalRepository')
    private rentalRepository: IRentalRepository,
    @inject('carRepository')
    private carRepository: ICarsRepository,
    @inject('dateProvider')
    private dateProvider: IDateProvider
  ){}


  async execute({ rentalId, carId}: IRequest): Promise<Rentals>{

    const rental = await this.rentalRepository.findById(rentalId)
    if(!rental){
      throw new AppError('Rental dos not exist')
    }

    const daysRental = this.dateProvider.compareInDays(new Date(), rental.start_date);
    const amount = rental.total ? rental.total * daysRental : 1;

    rental.total = amount;

    await this.rentalRepository.update(rental)
    return rental;
    

  }
}

export { DevolutionRentalUseCase }