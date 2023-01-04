import { CarImages } from "@prisma/client";
interface ICarImagesDTO {
  carId: string;
  imagePath: string;
}
interface IcarImageRepository {
  create({ carId, imagePath }: ICarImagesDTO): Promise<CarImages>;
}

export { IcarImageRepository }