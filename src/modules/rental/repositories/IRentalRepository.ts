import { Rentals } from "@prisma/client";
interface ICreateRentalDTO {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}
interface IRentalRepository {

  findCarRentedByCar(carId: string): Promise<Rentals | null>;
  findRentalOpenByUser(userId: string): Promise<Rentals | null>;
  findById(id: string): Promise<Rentals | null>
  create({carId, expectedReturnDate, userId}: ICreateRentalDTO): Promise<Rentals>;
  update(rental: Rentals): Promise<void>
  findByUserId(userId: string): Promise<Rentals | null>


}

export { IRentalRepository, ICreateRentalDTO }