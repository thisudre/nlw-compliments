import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function ensureAuthentication(request: Request, response: Response, next: NextFunction) {
    const bearerToken = request.headers.authorization;

    if(!bearerToken) {
        return response.status(401).end();
    }

    const [, token] = bearerToken.split(' ');

    try {
        const { sub } = verify(token, '150b6ab7984d575ec07d9443e6a3ee95') as IPayload;
        request.user_id = sub;
    } catch (error) {
        return response.status(401).end();
    }

    return next();
}