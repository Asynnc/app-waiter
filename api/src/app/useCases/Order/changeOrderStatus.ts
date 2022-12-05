import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function changeOrderStatus(request: Request, response: Response) {
  try {
    const { orderId } = request.params;
    const { status } = request.body;

    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      response.status(400).send('Status should be one of these: WAITING, IN_PRODUCTION, DONE');
      return;
    }

    await Order.findByIdAndUpdate(orderId, { status });

    response.sendStatus(204);

  } catch (error) {
    console.error(error);
    response.sendStatus(500).json({
      error: 'Internal Server Error.'
    });
  }
}
