import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoryController } from '../modules/cars/useCases/listCategory/ListCategoryController';
import { Upload } from '../shareds/upload/Upload';

const categoriesRouter = Router();

const uploadMiddleware = new Upload()

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

categoriesRouter.post('/', createCategoryController.handler);
categoriesRouter.get('/', listCategoryController.handler);
categoriesRouter.post('/upload', uploadMiddleware.single('../upload', 'file'), importCategoryController.handler);

export default categoriesRouter;
