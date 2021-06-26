import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import IController from './IController';

export default class CreateUserController implements IController {

    async handle(request: Request, response: Response) {

        const {name, email, admin, password} = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, email, admin, password});

        return response.json(user);
    }
}