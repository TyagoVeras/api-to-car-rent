import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'
class CreateCarSpecificationController {

  async handler(request: Request, response: Response){

    const { id } = request.params;
    const { specificationsId } = request.body;

    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

    await createCarSpecificationUseCase.execute({ carId: id, specificationsId})

    response.status(201).json({created: true})
  }
}

export { CreateCarSpecificationController }