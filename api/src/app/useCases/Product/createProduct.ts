import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function createProducts(request: Request, response: Response) {

  try {
    const imagePath = request.file?.filename;
    const product = await Product.create({
      name: request.body.name,
      description: request.body.description,
      imagePath,
      price: Number(request.body.price),
      category: request.body.category,
      ingredients: request.body.ingredients ? JSON.parse(request.body.ingredients) : []
    });

    response.status(201).json(product);
  } catch (error) {
    console.error(error);
    response.sendStatus(500).json({
      error: 'Internal Server Error.'
    });
  }
}
