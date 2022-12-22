import { Router } from "express";
import ensureAutenticate from "../middlewares/ensureAutenticate";
import ensureUserAdmin from "../middlewares/ensureUserAdmin";
import { CreateCarController } from '../modules/cars/useCases/createCar/CreateCarController'
import { ListCarController } from '../modules/cars/useCases/listCar/ListCarController'

const createCarController = new CreateCarController();
const listCarController = new ListCarController()
const carRouters = Router();

carRouters.post('/', ensureAutenticate, ensureUserAdmin, createCarController.handler)
carRouters.get('/availabe', listCarController.handler)

export default carRouters;