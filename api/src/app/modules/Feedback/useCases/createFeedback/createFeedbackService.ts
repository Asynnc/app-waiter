import { AppError, MissingParamError } from '../../../../errors';
import { Feedback } from '../../../../models/Feedback';
import { ICreateFeedback } from './createFeedbackDTO';

export class CreateFeedbackService {
  public async execute({ type, comment, screenshot }: ICreateFeedback) {
    if (!type) {
      throw new MissingParamError('Type');
    }

    if (!comment) {
      throw new MissingParamError('Comment');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new AppError('Invalid screenshot format.', 400);
    }

    const feedback = await Feedback.create({
      type,
      comment,
      screenshot
    });

    return feedback;
  }
}
