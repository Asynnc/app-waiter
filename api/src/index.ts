
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import http from 'node:http';
import path from 'node:path';
import { Server } from 'socket.io';
import globalError from './app/middlewares/globalError';
import { LogRequests } from './app/middlewares/logRequests';
import './app/middlewares/tracer';
import { authRouter } from './app/modules/Auth/routes/auth.routes';
import { router } from './router';
const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect(`${process.env.MongoDB_URL_Cloud}`)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(cors());
app.use(LogRequests);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use('/api', router);
app.use('/api/v2', authRouter);
app.use(globalError);

server.listen(process.env.PORT_SERVER, () => {
  console.log(`✅ Server listening on port ${process.env.PORT_SERVER}`);
});

