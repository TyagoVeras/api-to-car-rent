import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AppError from '../shareds/appError/AppError';
import { IUsersRepository } from '../modules/accounts/repositories/IUsersRepository';

interface IPayload{
    user: string;
}
@injectable()
class EnsureAuthenticate {
  constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,
  ) {}

  async ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('Token missing', 401);
    }

    const [, token] = authHeader.split(' ');

    let userId;
    try {
      const userPayload = verify(token, '12345678910') as IPayload;
      userId = userPayload.user;
    } catch (error) {
      throw new AppError('token invalid');
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found');
    }
    request.user = {
      id: user.id,
    };
    next();
  }
}

export { EnsureAuthenticate };
