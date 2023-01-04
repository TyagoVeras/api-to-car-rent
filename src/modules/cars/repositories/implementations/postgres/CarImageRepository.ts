import { CarImages } from "@prisma/client";
import prisma from '../../../../../services/database/prismaClient';
import { IcarImageRepository } from "../../ICarsImageRepository";

class CarImageRepository implements IcarImageRepository{
  async create({ carId, imagePath }: { carId: any; imagePath: any; }): Promise<CarImages> {
    const car = await prisma.carImages.create({
      data: {
        car_id: carId, 
        path: imagePath
      }
    });

    return car;
  }
}

export { CarImageRepository }