import { Router } from "express";
import { CreateRentalController } from "../modules/rental/useCase/createRental/CreateRentalController";
import ensureAutenticate from "../middlewares/ensureAutenticate";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post('/', ensureAutenticate, createRentalController.handler);

export { rentalRoutes }