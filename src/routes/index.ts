import { Router } from 'express';
import { accountsRouter } from './accounts.router';
import categoriesRouter from './categories.router';
import { specificationRoutes } from './specifications.router';
import carRouters from './cars.router';
import { rentalRoutes } from './rentals.router';

const router = Router();

router.use('/rentals', rentalRoutes)
router.use('/categories', categoriesRouter);
router.use('/specifications', specificationRoutes);
router.use('/accounts', accountsRouter);
router.use('/cars', carRouters)

export { router };
