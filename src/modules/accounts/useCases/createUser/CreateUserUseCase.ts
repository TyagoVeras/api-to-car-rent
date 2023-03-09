import { Users } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import AppError from '../../../../shareds/appError/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
     @inject('UsersRepository')
     private userRepository: IUsersRepository,
  ) {}

  async execute({
    name, driverLicense, email, password,
  }: ICreateUserDTO): Promise<Users> {
    const emailAlreadExists = await this.userRepository.findByEmail(email);

    if (emailAlreadExists) {
      throw new AppError('email already exists');
    }

    const passwordHash = await hash(password, 8);
    const user = await this.userRepository.create({
      name, driverLicense, email, password: passwordHash,
    });
    return user;
  }
}
export { CreateUserUseCase };
