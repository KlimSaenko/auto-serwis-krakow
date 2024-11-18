import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { loadEnv } from 'vite';

const env = loadEnv('production', process.cwd(), '');

function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token){
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        jwt.verify(token, env.VITE_ACCESS_SECRET_KEY, (err: any) => {
            if (err){
                console.log(err);
                return res.sendStatus(403);
            }
        });

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default verifyToken;