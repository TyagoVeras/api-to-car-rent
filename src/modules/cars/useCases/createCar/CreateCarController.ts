import { container } from "tsyringe"
import { CreateCarUseCase } from './CreateCarUseCase'
import { Request, Response } from "express";
class CreateCarController {

  async handler(request: Request, response: Response){
    const { available, brand, category_id, daily_rate, description, fine_amount, license_plate ,name } = request.body;
    const createCarUseCase = container.resolve(CreateCarUseCase)
    const car  = await createCarUseCase.execute({ available, brand, category_id, daily_rate, description, fine_amount, license_plate ,name })
    response.json(car)
  }
}

export { CreateCarController }