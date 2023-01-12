import { Rentals } from "@prisma/client";
import AppError from "../../../../shareds/appError/AppError";
import { IRentalRepository, ICreateRentalDTO } from "../../repositories/IRentalRepository"
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
interface IRequest {
  carId: string;
  userId: string;
  expectedReturnDate: Date;
}

class CreateRentalUseCase {

  constructor(
    private rentalRepository: IRentalRepository
  ){}

  private convertDateToUtc = (date: Date) => dayjs(date).utc().local().format();

  private compareDates =(dateInit: Date, dateEnd: Date) => {
    return dayjs(this.convertDateToUtc(dateInit)).diff(this.convertDateToUtc(dateEnd), 'hours')
  }

  async execute({ carId, expectedReturnDate, userId }: IRequest): Promise<Rentals>{

    const carIsRented = await this.rentalRepository.findCarRentedByCar(carId);
    if(carIsRented){
      throw new AppError('Car is rented')
    }

    const userHasOpenRent = await this.rentalRepository.findRentalOpenByUser(userId)
    if(userHasOpenRent){
      throw new AppError('User has open rent')
    }

    const compare = this.compareDates(expectedReturnDate, new Date())

    console.log(compare);
    
    const rental = await this.rentalRepository.create({
      userId,
      carId,
      expectedReturnDate
    })

    return rental;
    
  }
}

export { CreateRentalUseCase }