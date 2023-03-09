import { NextFunction, Request, Response } from 'express';
import { UsersPostgresRepository } from '../modules/accounts/repositories/implementations/postgres/UsersPostgresRespository';
import AppError from '../shareds/appError/AppError';

export default async (request: Request, response: Response, next: NextFunction) => {
  const { id } = request.user;

  const userRepository = new UsersPostgresRepository();
  const user = await userRepository.findById(id);
  if (!user?.isAdmin) {
    throw new AppError('User is not admin');
  }

  return next();
};
