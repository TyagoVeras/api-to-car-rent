import { Router } from "express";
import { Upload } from "../shareds/upload/Upload";
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserCaseController";
import { UpdateAvatarController } from "../modules/accounts/useCases/updateAvatarUseCase/UpdateAvatarController";
import ensureAutenticate from "../middlewares/ensureAutenticate";

const accountsRouter = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController()
const updateAvatarController = new UpdateAvatarController()
const uploadMiddleware = new Upload()

accountsRouter.post('/', createUserController.handler);
accountsRouter.post('/authenticate', authenticateUserController.handler)
accountsRouter.patch('/avatar', ensureAutenticate,  uploadMiddleware.single('../upload', 'avatar'), updateAvatarController.handler)

export { accountsRouter }