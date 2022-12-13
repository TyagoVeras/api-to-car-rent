import { Users } from "@prisma/client";
import prisma from "../../../../../services/database/prismaClient";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../IUsersRepository";

class UsersPostgresRepository implements IUsersRepository {
    async create({name,driverLicense,email,password}: ICreateUserDTO): Promise<Users> {
        const user = await prisma.users.create({
            data: {
                name,
                driver_license: driverLicense,
                email,
                password,
            },
        });
        return user;
    }

    async findByEmail(email: string): Promise<Users | null> {
        const user = await prisma.users.findFirst({
            where: {
                email,
            },
        });
        return user;
    }

    async findById(id: string): Promise<Users | null> {
        const user = await prisma.users.findFirst({
            where: {
                id
            }
        });
        return user;
    }

    async update(id: string, { name, driverLicense, email, password, avatar }: ICreateUserDTO){
        const user = await prisma.users.update({
            where: { id },
            data: {
                name,
                driver_license: driverLicense,
                email,
                password,
                avatar
            }
        });
        return user;
    }
}

export { UsersPostgresRepository };
