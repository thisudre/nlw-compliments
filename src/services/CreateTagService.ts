import { getCustomRepository } from "typeorm";
import TagsRepository from "../repositories/TagsRepository";
import IService from "./IService";

interface ITag {
    name: string
}

export default class CreateTagService implements IService {
    async execute({name}: ITag) {
        const tagsRepository = getCustomRepository(TagsRepository);
        if(!name) {
            throw new Error('Name is required');
        }

        const tagAlreadyExists = await tagsRepository.findOne({
            name
        });

        if(!!tagAlreadyExists) {
            throw new Error('Tag already exists');
        }

        const tag = tagsRepository.create({
            name
        });

        await tagsRepository.save(tag);

        return tag;
    }
}