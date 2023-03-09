import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import AppError from '../../../../shareds/appError/AppError';
import { AuthConfig } from '../../../../shareds/auth/AuthConfig';
import { IDateProvider } from '../../../../shareds/container/DateProvider/IDateProvider';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string,
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('DateProvider')
        private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User or password does not exists');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('User or password does not exists');
    }

    const token = sign({ user: user.id }, AuthConfig.getSecretToken(), {
      expiresIn: AuthConfig.getExpiresInToken(),
    });

    const refreshTokenEpiresDate = this.dateProvider.addDays(10);

    const refresh_token = sign({ email }, AuthConfig.getSecretRefreshToken(), {
      subject: user.id,
      expiresIn: AuthConfig.getExpiresInRefreshToken(),
    });

    try {
      verify(token, '12345678910');
    } catch (e) {
      throw new AppError('Erro to authenticate');
    }

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
