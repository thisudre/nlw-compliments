import { getCustomRepository } from "typeorm";
import ComplimentsRepository from "../repositories/ComplimentsRepository";
import UsersRepository from "../repositories/UsersRepository";
import IService from "./IService";

interface ICompliment {
    user_sender: string;
    user_receiver: string;
    tag_id: string;
    message: string
}

export default class CreateComplimentService implements IService {

    async execute({ user_sender, user_receiver, tag_id, message }: ICompliment) {
        const complimentRepository = getCustomRepository(ComplimentsRepository);
        const userRepository = getCustomRepository(UsersRepository);

        if(user_sender === user_receiver) {
            throw new Error('Cannot create self compliments');
        }
        const user_exists = await userRepository.findOne(user_receiver);

        if(!user_exists) {
            throw new Error('User not found');
        }

        const compliment = complimentRepository.create({
            user_sender,
            user_receiver,
            tag_id,
            message
        });

        await complimentRepository.save(compliment);

        return compliment;
    }

}