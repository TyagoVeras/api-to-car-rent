import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalByUserUseCase } from './ListRentalByUserUseCase';

class ListRentalByUserController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listRentalByUserUseCase = container.resolve(ListRentalByUserUseCase);
    const listRentals = await listRentalByUserUseCase.execute({ userId: id });
    return response.status(200).json({ listRentals });
  }
}

export { ListRentalByUserController };
