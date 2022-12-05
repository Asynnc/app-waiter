import { Request, Response } from 'express';
import { Category } from '../../models/Category';

export async function listCategories(request: Request, response: Response) {

  try {
    const categories = await Category.find();
    response.json(categories);
  } catch (error) {
    console.error(error);
    response.sendStatus(500).json({
      error: 'Internal Server Error.'
    });
  }

}
