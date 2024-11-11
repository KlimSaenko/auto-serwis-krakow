import express, { type Request, type Response } from 'express';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verifyToken from './middleware/authMiddleware';

const app = express();
const router = express.Router();
const port = import.meta.env.VITE_APP_PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

router.use((req, res, next) => {
    verifyToken(req, res, next);
});

router.post('/api/createBlogPost', (req: Request, res: Response) => {
    const { filename, content } = req.body as { filename: string; content: string };
    const filePath = path.join(__dirname, 'blog_posts', filename);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating file' });
        }
        res.json({ message: 'File created successfully' });
    });
});

router.post('/login', async (req: Request, res: Response) => {
    const date = Date();
    try {
        if (!(await bcrypt.compare(req.body.password, import.meta.env.VITE_ADMIN_SECRET_HASH))){
            throw new Error('Wrong password');
        }

        const data = {
            time: date
        };

        const token = jwt.sign(data, await bcrypt.hash(req.body.password, 12));

        res.send(token);
        res.status(201).json({
            message: 'User registered successfully ' +  date,
            data: {
                token
            }
        });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed ' +  date });
    }
});