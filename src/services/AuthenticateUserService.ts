import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import IService from "./IService";

interface IAuthenticate {
    email: string;
    password: string;
}

export default class AuthenticateUserService implements IService{

    async execute({email, password}: IAuthenticate) {
        const userRepository = getCustomRepository(UsersRepository);
        // verificar o email
        const user = await userRepository.findOne({
            email
        });
        if(!user) {
            throw new Error('Invalid Email/Password');
        }
        // verificar a senha

        const validPassword = compare(password, user.password);
        
        if(!validPassword) {
            throw new Error('Invalid Email/Password');
        }
        
        // gerar o token
        const token = sign({
            email: user.email
        }, "150b6ab7984d575ec07d9443e6a3ee95", {
            subject: user.id,
            expiresIn: '1d'
        });

        return token;
    }
}