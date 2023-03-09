import { Users } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../../shareds/appError/AppError';
import { DeleteFile } from '../../../../shareds/deleteFile/DeleteFile';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    userId: string;
    avatarPath: string;
}

@injectable()
class UpdateAvatarUseCase {
  constructor(
        @inject('UsersRepository')
        private userRepository : IUsersRepository,
  ) {}

  async execute({ userId, avatarPath }: IRequest): Promise<Users> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const deleteFile = new DeleteFile();
    await deleteFile.execute(`./upload/${avatarPath}`);
    const userUpdated = await this.userRepository.update(userId, {
      name: user.name, driverLicense: user.driver_license, email: user.email, password: user.password, avatar: avatarPath,
    });
    return userUpdated;
  }
}

export { UpdateAvatarUseCase };
