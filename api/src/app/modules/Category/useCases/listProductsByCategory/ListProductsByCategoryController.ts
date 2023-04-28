import { Request, Response } from 'express';
import { ListProductsByCategoryService } from './ListProductsByCategoryService';

export class ListProductsByCategoryController {
  constructor(private listProductsByCategoryService: ListProductsByCategoryService) { }

  async handle(request: Request, response: Response) {

    const { categoryID } = request.params;

    const listCategoryService = new ListProductsByCategoryService;

    const result = await listCategoryService.execute({ id: categoryID });

    return response.json(result);
  }
}
