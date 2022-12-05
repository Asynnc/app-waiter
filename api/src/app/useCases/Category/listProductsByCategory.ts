import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function listProductsByCategory(request: Request, response: Response) {

  try {
    const { categoryId } = request.params;

    const products = await Product.find()
      .where('category')
      .equals(categoryId);
    response.status(200).json(products);
  } catch (error) {
    console.error(error);
    response.sendStatus(500).json({
      error: 'Internal Server Error.'
    });
  }

}
