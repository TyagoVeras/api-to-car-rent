import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController{
    async handler(request: Request, response: Response){
        const { email, password } = request.body;
        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
        const user = await authenticateUserUseCase.execute({ email, password })
        return response.status(201).json(user)
    }
}

export { AuthenticateUserController }