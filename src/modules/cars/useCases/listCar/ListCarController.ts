import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarUseCase } from "./ListCarUseCase"

class ListCarController {
  async handler(request: Request, response: Response): Promise<Response>{
    const { brand, name, category_id } = request.query;

    const listCarUseCase = container.resolve(ListCarUseCase)
    const cars = await listCarUseCase.execute({ brand: brand as string, name: name as string, category_id: category_id as string});
    return response.status(200).json(cars)
  }
}

export { ListCarController }