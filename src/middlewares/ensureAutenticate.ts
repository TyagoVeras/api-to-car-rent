import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../shareds/appError/AppError';
import { UsersPostgresRepository } from '../modules/accounts/repositories/implementations/postgres/UsersPostgresRespository';

interface IPayload{
    user: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

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

  const userRepository = new UsersPostgresRepository();
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new AppError('User not found');
  }
  req.user = {
    id: user.id,
  };
  next();
};
