import { AppError, MissingParamError } from '../../../../core/shared/http/errors';
import { SubmitFeedbackService } from '../../../Mail/useCases/submitFeedback/submitFeedbackService';
import { ICreateFeedback } from './createFeedbackDTO';

export class CreateFeedbackService {
  public async execute({ type, comment, screenshot, mail, user }: ICreateFeedback) {
    if (!type) {
      throw new MissingParamError('Type');
    }

    if (!comment) {
      throw new MissingParamError('Comment');
    }

    const feedbackService = new SubmitFeedbackService;

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new AppError('Invalid screenshot format.', 400);
    }

    await feedbackService.sendMail({
      mail: mail,
      subject: 'Novo Feedback!',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #272727;">',
        '<h1>Feedback</h1>',
        `<p>Tipo: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot && ('<p>Screenshot: </p>' && `<img src="${screenshot}" alt="Imagem do print da tela" />`),
        '</div>',
      ].join('\n')
    });
  }
}
