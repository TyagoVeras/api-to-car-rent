import { Router } from "express";
import { CreateCarController } from '../modules/cars/useCases/createCar/CreateCarController'

const createCarController = new CreateCarController();

const carRouters = Router();

carRouters.post('/', createCarController.handler)

export default carRouters;