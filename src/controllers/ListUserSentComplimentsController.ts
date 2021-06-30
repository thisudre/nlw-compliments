import IController from "./IController";
import { Request, Response } from 'express';
import ListUserSentComplimentsService from "../services/ListUserSentComplimentsService";

export default class ListUserSentComplimentsController implements IController {

    async handle(request: Request, response: Response) {
        const listUserSentComplimentsService = new ListUserSentComplimentsService();
        const {user_id} = request;

        const compliments = await listUserSentComplimentsService.execute(user_id);

        return response.json(compliments);
    }

}