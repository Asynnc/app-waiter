import { Request, Response, Router } from 'express';
import { createCategoryController } from '../useCases/createCategory';
import { listCategoryController } from '../useCases/listCategory';

const categoryRouter = Router();

categoryRouter.post('/', (request: Request, response: Response) => {
  return createCategoryController.handle(request, response);
});

categoryRouter.get('/', (request: Request, response: Response) => {
  return listCategoryController.handle(request, response);
});

export { categoryRouter };
