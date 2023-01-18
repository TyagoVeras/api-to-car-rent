import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {

  async handler(request: Request, response: Response): Promise<Response>{
    const { carId, expectedReturnDate, userId } = request.body;
    const { id } = request.user;

    const createRentalUseCase = container.resolve(CreateRentalUseCase)

    const rental = await createRentalUseCase.execute({
      carId,
      expectedReturnDate, 
      userId
    });

    return response.status(201).json(rental)
  }
}

export { CreateRentalController }