import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import UsersRepository from "../repositories/UsersRepository";
import IService from "./IService";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

export default class CreateUserService implements IService{
    async execute({name, email, admin = false, password}: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepository);
        if(!email) {
            throw new Error('Email is required');
        }

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(!!userAlreadyExists) {
            throw new Error('User already exists');
        }

        const hashPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: hashPassword
        });

        await usersRepository.save(user);

        return user;
    }
}