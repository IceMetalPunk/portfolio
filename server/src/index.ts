import { config } from 'dotenv';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import { APIRouter } from './routes/api.js';
config();
const PORT: number = Number(process.env.PORT ?? 4141);
const server: Express = express();
const BASE_CLIENT_DIR = path.resolve(import.meta.dirname, '../../client/dist');
server.use(express.static(BASE_CLIENT_DIR));

server.use('/api', APIRouter);
server.get('/', (_: Request, res: Response) => {
  res.sendFile(path.resolve(BASE_CLIENT_DIR, 'index.html'));
});
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
