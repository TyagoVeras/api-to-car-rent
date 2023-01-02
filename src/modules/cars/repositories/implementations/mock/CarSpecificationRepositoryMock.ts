import { CarsSpecifications } from "@prisma/client";
import { ICarSpecificationRepository } from "../../ICarSpecificationRepository";

class CarSpecificationRepositoryMock implements ICarSpecificationRepository{

  private carSpecification: CarsSpecifications[] = []

  async create({ specificationId, carId }: { specificationId: any; carId: any; }): Promise<void> {
    const carSpecification = Object.assign({}, {
      car_id: carId,
      specification_id: specificationId
    })
    this.carSpecification.push(carSpecification)
  }

}

export { CarSpecificationRepositoryMock }