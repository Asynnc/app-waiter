import { Request, Response } from 'express';
import { AppError } from '../../errors';
import { Feedback } from '../../models/Feedback';

export async function createFeedback(request: Request, response: Response) {
  try {

    const { type, comment, screenshot } = request.body;

    if (!type || !comment) {
      throw new AppError('A type and a comment is required.', 422);
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new AppError('Invalid screenshot format.', 400);
    }

    const feedback = await Feedback.create({
      type,
      comment,
      screenshot
    });

    return response.status(201).json(feedback);
  }
  catch (error) {
    console.error(error);
    response.sendStatus(500).json({
      error: 'Internal Server Error.'
    });
  }
}
