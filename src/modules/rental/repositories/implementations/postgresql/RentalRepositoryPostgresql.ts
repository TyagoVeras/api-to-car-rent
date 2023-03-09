import { Rentals } from '@prisma/client';
import { ICreateRentalDTO, IRentalRepository } from '../../IRentalRepository';
import prisma from '../../../../../services/database/prismaClient';

class RentalRepositoryPostgresql implements IRentalRepository {
  update(rental: Rentals): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findByUserId(userId: string): Promise<Rentals | null> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Rentals | null> {
    const rental = await prisma.rentals.findFirst({
      where: {
        id,
      },
      include: {
        car: true,
      },
    });
    return rental;
  }

  async findCarRentedByCar(carId: string): Promise<Rentals | null> {
    const rental = await prisma.rentals.findFirst({
      where: {
        car_id: carId,
      },
    });

    return rental;
  }

  async findRentalOpenByUser(userId: string): Promise<Rentals | null> {
    const rentalOpen = await prisma.rentals.findFirst({
      where: {
        user_id: userId,
        expected_return_date: {
          equals: undefined,
        },
      },
    });
    return rentalOpen;
  }

  async create({ carId, expectedReturnDate, userId }: ICreateRentalDTO): Promise<Rentals> {
    const rentalCreated = await prisma.rentals.create({
      data: {
        car_id: carId,
        expected_return_date: expectedReturnDate,
        user_id: userId,
        start_date: new Date(),
      },
    });
    return rentalCreated;
  }
}

export { RentalRepositoryPostgresql };
