import { Router } from "express";
import ensureAutenticate from "../middlewares/ensureAutenticate";
import ensureUserAdmin from "../middlewares/ensureUserAdmin";
import { CreateCarController } from '../modules/cars/useCases/createCar/CreateCarController'
import { ListCarController } from '../modules/cars/useCases/listCar/ListCarController'
import { CreateCarSpecificationController } from '../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { UploadCarImagesController } from "../modules/cars/useCases/uploadCarImage/UploadCarImagesController";
import { Upload } from "../shareds/upload/Upload";

const createCarController = new CreateCarController();
const listCarController = new ListCarController()
const specification = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()
const carRouters = Router();

const uploadMiddleware = new Upload()


carRouters.post('/', ensureAutenticate, ensureUserAdmin, createCarController.handler)
carRouters.get('/availabe', listCarController.handler)
carRouters.post('/specification/:id', specification.handler)
carRouters.post('/images/:id', uploadMiddleware.multiple('./temp/cars', 'images'), uploadCarImagesController.handler)

export default carRouters;