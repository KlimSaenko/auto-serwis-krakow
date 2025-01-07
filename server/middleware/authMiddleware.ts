import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token){
        return res.status(401).send({ error: 'Access denied: invalid token' });
    }

    try {
        jwt.verify(token, env.VITE_ACCESS_SECRET_KEY, (err: any) => {
            if (err){
                console.log(err);
                return res.status(403).send({ error: 'Access denied: invalid token' });
            }

            next();
        });
    } catch (error) {
        return res.status(401).send({ error: 'Access denied: unknown issue' });
    }
};

export default verifyToken;