import { Rentals } from '@prisma/client';
import { ICreateRentalDTO, IRentalRepository } from '../../IRentalRepository'

class RentalRepositoryMock implements IRentalRepository{

  rentals: Rentals[] = []

  async findCarRentedByCar(carId: string): Promise<Rentals | null> {
    return this.rentals.find(rental => rental.car_id === carId && !rental.end_date) ?? null;
  }
  async findRentalOpenByUser(userId: string): Promise<Rentals | null> {
    return this.rentals.find(rental => rental.user_id === userId && !rental.end_date) ?? null;
  }
  async create({ carId, expectedReturnDate, userId }: ICreateRentalDTO): Promise<Rentals> {
    const rental = Object.assign({}, {
      car_id: carId,
      expected_return_date: expectedReturnDate,
      user_id:userId,
      id: Math.random().toString(16)
      
    }) as Rentals;

    this.rentals.push(rental)

    return rental;
  }

}

export { RentalRepositoryMock }