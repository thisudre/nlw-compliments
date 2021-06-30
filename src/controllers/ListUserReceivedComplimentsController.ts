import IController from "./IController";
import { Request, Response } from 'express';
import ListUserReceivedComplimentsService from "../services/ListUserReceivedComplimentsService";

export default class ListUserReceivedComplimentsController implements IController{

    async handle(request: Request, response: Response) {
        const listUserReceivedComplimentsService = new ListUserReceivedComplimentsService();
        const { user_id } = request;

        const compliment = await listUserReceivedComplimentsService.execute(user_id);

        return response.json(compliment);
    }

}