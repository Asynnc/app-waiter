import nodemailer from 'nodemailer';
import { ISendMailData } from './submitFeedbackDTO';

const transport = nodemailer.createTransport({
  host: process.env.TRANSPORT_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.TRANSPORT_AUTH_USER,
    pass: process.env.TRANSPORT_AUTH_PASS,
  },
  tls: { rejectUnauthorized: false },
});

export class SubmitFeedbackService {
  public async sendMail({ subject, body }: ISendMailData): Promise<void> {

    try {
      await transport.sendMail({
        from: process.env.TRANSPORT_AUTH_USER,
        to: 'tonybsilvadev@gmail.com',
        subject,
        html: body
      });
    }
    catch (error) {
      console.log(error);
    }
  }

}
