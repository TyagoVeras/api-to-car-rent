interface ICarSpecificationDTO {
  specificationId: string;
  carId: string;
}

interface ICarSpecificationRepository {
  create({ specificationId, carId }: ICarSpecificationDTO): Promise<void>;
}

export { ICarSpecificationRepository }