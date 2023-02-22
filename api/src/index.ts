
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import http from 'node:http';
import path from 'node:path';
import { Server } from 'socket.io';
import { LogRequests } from './app/middlewares/logRequests';
import { router } from './router';


const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect(`${process.env.MongoDB_URL_Cloud}`)
  .then(
    () => {
      app.use(express.json());
      app.use(cors());
      app.use(LogRequests);
      app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
      app.use('/api', router);



      server.listen(process.env.PORT_SERVER, () => {
        console.log('✅ MongoDB Connected!');
        console.log('✅ Server listening on port 3001');
      });
    }
  )
  .catch((err) => console.error(err));

