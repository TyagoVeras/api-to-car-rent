import { Rentals } from "@prisma/client";
interface ICreateRentalDTO {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}
interface IRentalRepository {

  findCarRentedByCar(carId: string): Promise<Rentals | null>;
  findRentalOpenByUser(userId: string): Promise<Rentals | null>;
  create({carId, expectedReturnDate, userId}: ICreateRentalDTO): Promise<Rentals>;

}

export { IRentalRepository, ICreateRentalDTO }