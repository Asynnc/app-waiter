import { Request, Response } from 'express';
import { Category } from '../../models/Category';

export async function createCategories(request: Request, response: Response) {

  try {
    const category = await Category.create({
      name: request.body.name,
      icon: request.body.icon,
    });

    response.status(201).json(category);
  } catch (error) {
    console.error(error);
    response.sendStatus(500).json({
      error: 'Internal Server Error.'
    });
  }
}
