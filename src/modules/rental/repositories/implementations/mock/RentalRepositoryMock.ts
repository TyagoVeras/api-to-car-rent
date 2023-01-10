import { Rentals } from '@prisma/client';
import { IRentalRepository } from '../../IRentalRepository'

class RentalRepositoryMock implements IRentalRepository{

  rentals: Rentals[] = []

  async findCarRentedByCar(carId: string): Promise<Rentals | null> {
    return this.rentals.find(rental => rental.car_id === carId && rental.end_date === null) ?? null;
  }
  async findRentalOpenByUser(userId: string): Promise<Rentals | null> {
    return this.rentals.find(rental => rental.user_id === userId && rental.end_date === null) ?? null;
  }

}

export { RentalRepositoryMock }