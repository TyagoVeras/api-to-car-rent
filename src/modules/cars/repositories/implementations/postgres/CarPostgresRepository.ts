import { Cars } from '@prisma/client';
import {ICarsRepository, ICreateCarDTO, IFindDTO} from  '../../ICarsRepository'
import prisma from '../../../../../services/database/prismaClient';


class CarPostgresRepository implements ICarsRepository {
  async updateAvailable(id: string, available: boolean): Promise<Cars> {
   return await prisma.cars.update({
    data: {
      available
    },
    where: {
      id
    }
   })
  }
  
  async findById(id: string): Promise<Cars | null> {
    return await prisma.cars.findFirst({
      where: {
        CarsSpecifications: {
          every: {
            specification_id: id
          }
        }
      }
    })
  }
  findAvailable({ category_id, name, brand }: IFindDTO): Promise<Cars[] | null> {
   const cars = prisma.cars.findMany({
    where: {
      available: true,
      OR: [
        {
          name: {
            contains: name
          }
        },
        {
          category_id: {
            equals: category_id
          }
        },
        {
          brand: {
            equals: brand
          }
        }
      ]
    }
   });
   return cars
  }



  create({ category_id, daily_rate, description, fine_amount, license_plate, name, available, brand, specifications }: ICreateCarDTO): Promise<Cars> {
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