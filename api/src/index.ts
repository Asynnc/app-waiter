
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';
import { LogRequests } from './app/middlewares/logRequests';
import { router } from './router';

mongoose.connect(`${process.env.MongoDB_URL_Cloud}`)
  .then(
    () => {
      const app = express();
      app.use(express.json());
      app.use(cors());
      app.use(LogRequests);
      app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
      app.use('/api', router);
      app.listen( process.env.PORT_SERVER , () => {
        console.log('✅ Server listening on port 3001');
      });
    }
  )
  .catch((err) => console.error(err));

