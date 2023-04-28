export interface ICreateFeedback {
  type: 'BUG' | 'IDEA' | 'OTHER',
  comment: string;
  screenshot: string;
}
