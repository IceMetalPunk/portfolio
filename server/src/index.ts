import { config } from 'dotenv';
import path from 'path';
config();
import express, { Express, Request, Response } from 'express';
const PORT: number = Number(process.env.PORT ?? 4141);
const server: Express = express();
const BASE_CLIENT_DIR = path.resolve(import.meta.dirname, '../../client/dist');
server.use(express.static(BASE_CLIENT_DIR));

server.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve(BASE_CLIENT_DIR, 'index.html'));
});
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
