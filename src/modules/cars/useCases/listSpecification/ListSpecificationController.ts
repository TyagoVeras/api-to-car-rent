import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListSpecificationUseCase } from './ListSpecificationUseCase';

class ListSpecificationController {
  async handler(request: Request, response: Response) {
    const listSpecificationUseCase = container.resolve(ListSpecificationUseCase);
    const specifications = await listSpecificationUseCase.execute();

    return response.status(200).json({ specifications });
  }
}

export { ListSpecificationController };
