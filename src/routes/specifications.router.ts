import { Router } from 'express';
import ensureAutenticate from '../middlewares/ensureAutenticate';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '../modules/cars/useCases/listSpecification/ListSpecificationController';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationRoutes.use(ensureAutenticate);
specificationRoutes.post('/', createSpecificationController.handler);
specificationRoutes.get('/', listSpecificationController.handler);

export { specificationRoutes };
