export interface ISendMailData {
  subject: string
  body: string
}


export interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void>;
}
