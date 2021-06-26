import { Request, Response } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";
import IController from "./IController";

export default class AuthenticateUserController implements IController {

    async handle(request: Request, response: Response) {
        const authenticateUserService = new AuthenticateUserService();
        const {email, password} = request.body;

        const token = await authenticateUserService.execute({email, password});

        return response.json(token);
    }
}