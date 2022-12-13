import "reflect-metadata"
import AppError from "../../../../shareds/appError/AppError";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryMock } from "../../repositories/implementations/mock/UserRepositoryMock";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let userRepositoryMock : UserRepositoryMock;
let createUserUserCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase

describe('Authenticate user', ()=>{

    beforeEach(()=>{
        userRepositoryMock = new UserRepositoryMock();
        createUserUserCase = new CreateUserUseCase(userRepositoryMock);
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryMock)
    });

    it('Should be able to authenticate an user', async()=>{
        const user: ICreateUserDTO = {
            driverLicense: 'asdf',
            email: 'tyago@obi.tec.br',
            name: 'tyago',
            password: '123',
        };

        await createUserUserCase.execute(user);
        const result = await authenticateUserUseCase.execute({ email: user.email, password: user.password});
        expect(result).toHaveProperty('token')
    })

    it('Should be not autnehticate with user not existent', ()=>{
        expect(async ()=>{
            await authenticateUserUseCase.execute({
                email: 'notexistent@gmail.com',
                password: '00000'
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('Should be not authenticate with password incorrect', async ()=>{
        expect(async ()=>{
            const user: ICreateUserDTO = {
                driverLicense: '0000',
                email: 'teste@teste.com',
                name: 'joaodasilva',
                password: '123456'
            }
    
            await createUserUserCase.execute(user)
    
            await authenticateUserUseCase.execute({ email: user.email, password: 'incorrect'})
        }).rejects.toBeInstanceOf(AppError)
    })
})