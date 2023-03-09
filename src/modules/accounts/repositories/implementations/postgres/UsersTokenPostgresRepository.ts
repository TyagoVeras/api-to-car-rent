/* eslint-disable camelcase */
import { UsersToken } from '@prisma/client';
import { ICreateUserTokenDTO } from '../../../dtos/ICreateUserTokenDTO';
import { IUserTokenRepository } from '../../IUsersTokenRepository';
import prisma from '../../../../../services/database/prismaClient';

class UsersTokenPostegresRepository implements IUserTokenRepository {
  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UsersToken> {
    const userToken = await prisma.usersToken.create({
      data: {
        refresh_token,
        user_id,
        expires_date,
      },
    });
    return userToken;
  }
}
