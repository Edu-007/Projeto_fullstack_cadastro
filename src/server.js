import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './router/rou.js';

const server = express();
const PORT = process.env.PORT;

server.use(express.json());
server.use(cors())
server.use('/', router);

server.listen( PORT );