import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/UsersRepository";
import IService from "./IService";

export default class ListUsersService implements IService {

    async execute() {
        const usersRepository = getCustomRepository(UsersRepository);

        const users = await usersRepository.find();

        return users;
    }
}