import { Rentals } from '@prisma/client';
import { ICreateRentalDTO, IRentalRepository } from '../../IRentalRepository';

class RentalRepositoryMock implements IRentalRepository {
  update(rental: Rentals): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findByUserId(userId: string): Promise<Rentals | null> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Rentals | null> {
    return this.rentals.find((rental) => rental.id === id) ?? null;
  }

  rentals: Rentals[] = [];

  async findCarRentedByCar(carId: string): Promise<Rentals | null> {
    return this.rentals.find((rental) => rental.car_id === carId && !rental.end_date) ?? null;
  }

  async findRentalOpenByUser(userId: string): Promise<Rentals | null> {
    return this.rentals.find((rental) => rental.user_id === userId && !rental.end_date) ?? null;
  }

  async create({ carId, expectedReturnDate, userId }: ICreateRentalDTO): Promise<Rentals> {
    const rental = ({
      car_id: carId,
      expected_return_date: expectedReturnDate,
      user_id: userId,
      id: Math.random().toString(16),
    }) as Rentals;

    this.rentals.push(rental);

    return rental;
  }
}

export { RentalRepositoryMock };
