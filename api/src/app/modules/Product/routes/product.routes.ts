import cuid from 'cuid';
import { Request, Response, Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import { createProductController } from '../useCases/createProduct';
import { listProductController } from '../useCases/listProduct';

const productsRouter = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(request, file, callback) {
      callback(null, path.resolve(__dirname, '..', '..', '..', '..', '..', 'uploads'));
    },
    filename(request, file, callback) {
      callback(null, `${cuid()}-${file.originalname}`);
    }
  })
});

productsRouter.post('/', upload.single('image'), (request: Request, response: Response) => {
  return createProductController.handle(request, response);
});

productsRouter.get('/', (request: Request, response: Response) => {
  return listProductController.handle(request, response);
});

export { productsRouter };
