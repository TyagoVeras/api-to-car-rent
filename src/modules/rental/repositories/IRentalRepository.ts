import { Rentals } from "@prisma/client";

interface IRentalRepository {

  findCarRentedByCar(carId: string): Promise<Rentals | null>;
  findRentalOpenByUser(userId: string): Promise<Rentals | null>;

}

export { IRentalRepository }