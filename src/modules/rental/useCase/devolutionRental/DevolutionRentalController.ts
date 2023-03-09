import { Request, Response } from 'express'
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';
import { container } from 'tsyringe';
class DevolutionRentalController {

  async handler(request: Request, response: Response) : Promise<Response>{

    const { id: user_id } = request.user;
    const { id } = request.params;

    const devolutionUseCase = container.resolve(DevolutionRentalUseCase)
    const rental = await devolutionUseCase.execute({ carId: user_id, rentalId: id});

    return response.status(200).json(rental)
  }
}

export { DevolutionRentalController }