
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import path from 'node:path';



mongoose.connect('mongodb://localhost:27017')
  .then(
    () => {
      const app = express();
      app.use(express.json());
      app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
      app.use(router);
      app.listen(3001, () => {
        console.log('✅ Server listening on port 3001');
      });
    }
  )
  .catch((err) => console.error(err));

