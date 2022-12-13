import { Users } from '@prisma/client';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository{
    create({ name, driverLicense, email, password}: ICreateUserDTO): Promise<Users>;
    findByEmail(email: string): Promise<Users | null>;
    findById(id: string): Promise<Users | null>;
    update(id: string, { name, driverLicense, email, password, avatar }: ICreateUserDTO): Promise<Users>
}

export { IUsersRepository };
