import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from 'bcrypt'
import { sign, verify } from "jsonwebtoken";
import AppError from "../../../../shareds/appError/AppError";

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
        private userRepository: IUsersRepository
    ){}
    async execute({ email, password}: IRequest): Promise<IResponse>{
        const user = await this.userRepository.findByEmail(email);
        console.log(user);
        
        if(!user){
            throw new AppError('User or password does not exists')
        }
        
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new AppError('User or password does not exists')
        }

        const token = sign({user: user.id}, '12345678910', {
            expiresIn: '365d',
        });   
        
        try{
            verify(token, '12345678910')
        }catch(e){
            throw new AppError('Erro to authenticate')
        }           

        return {
            user:{
                name: user.name,
                email: user.email,
            },
            token
        }
    }

}

export { AuthenticateUserUseCase }