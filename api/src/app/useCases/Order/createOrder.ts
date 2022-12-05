import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function createOrder(request: Request, response: Response) {

  try {
    const order = await Order.create({
      table: request.body.table,
      products: request.body.products,
    });

    response.status(201).json(order);
  } catch (error) {
    console.error(error);
    response.sendStatus(500).json({
      error: 'Internal Server Error.'
    });
  }
}
