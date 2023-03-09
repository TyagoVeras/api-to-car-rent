import { UsersToken } from '@prisma/client';
import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';

interface IUserTokenRepository {
  create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UsersToken>
}

export { IUserTokenRepository };
