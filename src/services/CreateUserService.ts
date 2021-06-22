import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/UsersRepository";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

export default class CreateUserService {

    async execute({name, email, admin}: IUserRequest) {
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

        const user = usersRepository.create({
            name,
            email,
            admin
        });

        await usersRepository.save(user);

        return user;
    }
}