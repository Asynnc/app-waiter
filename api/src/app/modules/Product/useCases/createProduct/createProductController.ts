import { Request, Response } from 'express';
import { CreateProductService } from './createProductService';

export class CreateProductController {
  constructor(private createUserService: CreateProductService) { }

  async handle(request: Request, response: Response) {

    const { name, description, price, category, ingredients } = request.body;

    const image = request.file?.filename;

    const ingredientsParsed = JSON.parse(ingredients);

    const createProductService = new CreateProductService;

    const result = await createProductService.execute({ name, description, image, price, category, ingredients: ingredientsParsed });

    return response.json(result);
  }
}
