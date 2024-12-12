import express, { type Request, type Response } from 'express';
import ViteExpress from "vite-express";
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loadEnv } from 'vite';
import verifyToken from './middleware/authMiddleware';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname } from 'path';
import NodeCache from 'node-cache';
import multer from 'multer';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const env = loadEnv('production', process.cwd(), '');
const port = 3000;

const serverCache = new NodeCache();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/assets/images');
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(12, function (err, raw) {
            cb(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
});
const upload = multer({ storage: storage })

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
    const { filename } = req.params;
    if (filename === 'create'){
        res.status(400).json({ error: `File can't be called as 'create'` });
        return;
    }

    const { postContent } = req.body as { postContent: any };
    const filePath = path.join(__dirname, 'blog_posts', filename + '.json');

    postContent.timeUpdated = Date.now();
    postContent.url = filename;

    fs.writeFile(filePath, JSON.stringify(postContent), (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error creating file' });
        }
        res.json({ message: 'File created successfully' });
    });
});



app.put('/api/admin/blog/:filename', (req: Request, res: Response) => {
    const { filename } = req.params;
    if (filename === 'create'){
        res.status(400).json({ error: `File can't be called as 'create'` });
        return;
    }

    const { postContent } = req.body as { postContent: any };
    const filePath = path.join(__dirname, 'blog_posts', filename + '.json');

    fs.writeFile(filePath, postContent, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error creating file' });
        }
        res.json({ message: 'File created successfully' });
    });
});



app.get('/api/blog/:filename', (req: Request, res: Response) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'blog_posts', filename + '.json');

    try {
        if (fs.existsSync(filePath)){
            const fileContent = fs.readFileSync(filePath, "utf8");
            res.json({ filedata: JSON.parse(fileContent) });
        } else {
            res.status(400).json({ error: "Blog post doesn't exist" });
        }
    } catch (err) {
        res.status(400).json({ error: "Blog post doesn't exist" });
    }
});



app.post('/api/login', async (req: Request, res: Response) => {
    const date = Date();
    try {
        const result = await bcrypt.compare(req.body.password, env.VITE_ADMIN_PASSWORD_HASH);
        if (!result){
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



app.post('/api/admin/uploader', upload.single('image'), async (req: Request, res: Response) => {
    if (req.file){
        res.json({ filePath: path.normalize('/' + req.file.path) });
    } else {
        res.status(404).json({ error: 'File loading failed' });
    }
});



app.get('/api/getServerTime', async (req: Request, res: Response) => {
    const timeElapsed = Date.now();
    
    res.json({ timeElapsed });
});



app.get('/api/getOpenHours', async (req: Request, res: Response) => {
    const timeElapsed = Date.now();

    try {
        res.json({ timeElapsed });
    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
    }
});



app.get('/api/admin/verifyToken', async (req: Request, res: Response) => {
    res.status(200).send();
});



app.get('/api/blog/p/:pageIndex', async (req: Request, res: Response) => {
    try {
        let posts = serverCache.get('blogPosts') as { title: string, url: string }[];
    
        if (!posts){
            const filePath = path.join(__dirname, 'blog_posts');
        
            const files = fs.readdirSync(filePath).filter(file => path.extname(file) == '.json');
            const filesContent = await Promise.all(
                files.map(async (file) => {
                    const content = await fs.promises.readFile(path.join(filePath, file), 'utf8');
                    return { name: path.parse(file).name, content: JSON.parse(content) };
                }));
        
            posts = filesContent.sort(file => file.content.timeUpdated).map(file => {
                return { title: file.content.title, url: file.name };
            });
        
            if (!serverCache.set('blogPosts', posts, 10000)){
                console.warn('Posts were not cached');
            }
        }
    
        const index = Number(req.params.pageIndex);
        let loadCount = Number(req.query.loadCount as string);
        loadCount = isNaN(loadCount) ? 6 : loadCount;

        if (isNaN(index) || index < 1 || (index - 1) * loadCount >= posts.length) {
            res.status(404).json({ error: 'Incorrect blog page index' });
            return;
        }
    
        const firstIndex = (index - 1) * loadCount;
        posts = posts.slice(firstIndex, firstIndex + loadCount);
        
        res.json({ posts, pageCount: Math.ceil(posts.length / loadCount) });
    } catch (err) {
        console.error('Error retrieving blog posts', err);
        res.status(500).json({ error: 'Error retrieving blog posts' });
    }
});