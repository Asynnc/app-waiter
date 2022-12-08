
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import cors from 'cors';
import path from 'node:path';
import { LogRequests } from './app/middlewares/logRequests';

mongoose.connect('mongodb://localhost:27017/?authSource=local')
  .then(
    () => {
      const app = express();
      app.use(express.json());
      app.use(cors());
      app.use(LogRequests);
      app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
      app.use('/api', router);
      app.listen(3001, () => {
        console.log('✅ Server listening on port 3001');
      });
    }
  )
  .catch((err) => console.error(err));

