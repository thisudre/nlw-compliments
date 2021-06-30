import { getCustomRepository } from "typeorm";
import ComplimentsRepository from "../repositories/ComplimentsRepository";
import IService from "./IService";

export default class ListUserSentComplimentsService implements IService {
    async execute(user_id: string) {
        const complimentsRepository = getCustomRepository(ComplimentsRepository);

        const compliments = await complimentsRepository.find({
            where: {user_sender: user_id}
        });

        return compliments;

    }
}