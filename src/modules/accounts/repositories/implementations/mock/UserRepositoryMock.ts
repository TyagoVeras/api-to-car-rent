import { Users } from "@prisma/client";
import AppError from "../../../../../shareds/appError/AppError";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../IUsersRepository";

class UserRepositoryMock implements IUsersRepository{

    private users: Users[] = []

    async create({ name, driverLicense, email, password }: ICreateUserDTO): Promise<Users> {
        let user: Users;
        user = Object.assign({}, {
            id: Math.random().toString(16),
            name,
            driver_license: driverLicense,
            email, 
            password,
            created_at: new Date(),
            isAdmin: false,
            avatar: ''
        });

        this.users.push(user);
        return user;

    }
    async findByEmail(email: string): Promise<Users | null> {
       return this.users.find((user)=> user.email === email) || null;
    }
    async findById(id: string): Promise<Users | null> {
        return this.users.find((user)=> user.id === id) || null;
    }
    async update(id: string, { name, driverLicense, email, password, avatar }: ICreateUserDTO): Promise<Users> {
        let user: Users;

        const userExists = this.users.findIndex((user) => user.id === id);

        if(!userExists){
            throw new AppError('User not exists', 404)
        }

        user = Object.assign({}, {
            id,
            name,
            driver_license: driverLicense,
            email, 
            password,
            created_at: new Date(),
            isAdmin: false,
            avatar: ''
        })



        this.users.splice(userExists, 1, user)

        return user;

    }

}

export { UserRepositoryMock }