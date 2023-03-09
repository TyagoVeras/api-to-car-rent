import { Router } from 'express';
import { CreateRentalController } from '../modules/rental/useCase/createRental/CreateRentalController';
import ensureAutenticate from '../middlewares/ensureAutenticate';
import { DevolutionRentalController } from '../modules/rental/useCase/devolutionRental/DevolutionRentalController';
import { ListRentalByUserController } from '../modules/rental/useCase/listRentalByUser/ListRentalByUserController';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const rentalByUserController = new ListRentalByUserController();

rentalRoutes.post('/', ensureAutenticate, createRentalController.handler);
rentalRoutes.post('/devolution/:id', ensureAutenticate, devolutionRentalController.handler);
rentalRoutes.get('/users', ensureAutenticate, rentalByUserController.handler);

export { rentalRoutes };
