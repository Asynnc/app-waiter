import { Request, Response, Router } from 'express';
import { createProductController } from '../useCases/createProduct';
import { listProductController } from '../useCases/listProduct';

const productsRouter = Router();

productsRouter.post('/', (request: Request, response: Response) => {
  return createProductController.handle(request, response);
});

productsRouter.get('/', (request: Request, response: Response) => {
  return listProductController.handle(request, response);
});

export { productsRouter };
