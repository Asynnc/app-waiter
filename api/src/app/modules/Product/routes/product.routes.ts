import { Request, Response, Router } from 'express';
import multer from 'multer';
import { multerConfig } from '../../../config/multer';
import { createProductController } from '../useCases/createProduct';
import { listProductController } from '../useCases/listProduct';

const productsRouter = Router();

const upload = multer(multerConfig);

productsRouter.post('/', upload.single('image'), (request: Request, response: Response) => {
  return createProductController.handle(request, response);
});

productsRouter.get('/', (request: Request, response: Response) => {
  return listProductController.handle(request, response);
});

export { productsRouter };
