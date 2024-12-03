import express, { type Request, type Response } from 'express';
import ViteExpress from "vite-express";
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loadEnv } from 'vite';
import verifyToken from './middleware/authMiddleware';

const app = express();
const env = loadEnv('production', process.cwd(), '');
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ViteExpress.static());

app.use('/api/admin', (req, res, next) => {
    verifyToken(req, res, next);
});

ViteExpress.listen(app, port, () => {
    console.log(`Server is running on port ${port}`);
});

app.post('/api/admin/blog/:filename', (req: Request, res: Response) => {
    const { postContent } = req.body as { postContent: any };
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'blog_posts', filename + '.json');

    fs.writeFile(filePath, JSON.stringify(postContent), (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error creating file' });
        }
        res.json({ message: 'File created successfully' });
    });
});

app.put('/api/admin/blog/:filename', (req: Request, res: Response) => {
    const { content } = req.body as { content: string };
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'blog_posts', filename);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error creating file' });
        }
        res.json({ message: 'File created successfully' });
    });
});

app.get('/api/admin/blog/:filename', (req: Request, res: Response) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'blog_posts', filename);

    if (fs.existsSync(filePath)){
        const fileContent = fs.readFileSync(filePath);

        res.json({ content: fileContent });
    } else {
        res.status(400).json({ error: "Blog post doesn't exist" });
    }
});

app.post('/api/login', async (req: Request, res: Response) => {
    const date = Date();
    try {
        if (!(await bcrypt.compare(req.body.password, env.VITE_ADMIN_PASSWORD_HASH))){
            console.log(`Failed login attempt. IP: ${req.ip}. ${date}. Password: ${req.body.password}`);
            throw new Error('Wrong password');
        }

        const payload = {
            data: date
        };

        const token = jwt.sign(payload, env.VITE_ACCESS_SECRET_KEY, { expiresIn: '1h' });

        res.cookie('frontauto_access_token', token);
        res.status(201).json({
            message: 'User registered successfully'
        });

        console.log(`User registered successfully. IP: ${req.ip}. ` + date);
    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
        console.log('Login failed. ' + date);
    }
});

app.get('/api/getOpenHours', async (req: Request, res: Response) => {
    const date = Date();
    try {
        
    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
        console.log('Login failed. ' + date);
    }
});

app.get('/api/admin/verifyToken', async (req: Request, res: Response) => {
    res.status(200).send();
});