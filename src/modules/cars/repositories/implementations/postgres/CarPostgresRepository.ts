import { Cars } from '@prisma/client';
import {ICarsRepository, ICreateCarDTO} from  '../../ICarsRepository'
import prisma from '../../../../../services/database/prismaClient';


class CarPostgresRepository implements ICarsRepository {
  create({ category_id, daily_rate, description, fine_amount, license_plate, name, available, brand }: ICreateCarDTO): Promise<Cars> {
   const car = prisma.cars.create({
    data: {
      category_id, brand, daily_rate, description, fine_amount, license_plate, name, available
    }
   })
   return car;
  }
  findByLicensePlate(licensePlate: string): Promise<Cars | null> {
    const car = prisma.cars.findFirst(
      {
        where: { license_plate: licensePlate }
      }
    )
    return car;
  }

}

export { CarPostgresRepository }