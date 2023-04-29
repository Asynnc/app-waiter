import nodemailer from 'nodemailer';
import { ISendMailData } from './submitFeedbackDTO';

const transport = nodemailer.createTransport({
  host: process.env.TRANSPORT_HOST,
  port: Number(process.env.TRANSPORT_PORT || 2525),
  auth: {
    user: process.env.TRANSPORT_AUTH_USER,
    pass: process.env.TRANSPORT_AUTH_PASS
  }
});


export class SubmitFeedbackService {
  public async sendMail({ subject, body }: ISendMailData): Promise<void> {
    await transport.sendMail({
      from: 'The Coffee Class <feedback@thecoffeeclass.com>',
      to: 'tonybsilvadev@gmail.com',
      subject,
      html: body
    });
  }
}
