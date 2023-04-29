import { model, Schema } from 'mongoose';

export const Feedback = model('Feedback', new Schema({
  type: { type: String, required: true, enum: ['BUG', 'IDEA', 'OTHER'] },
  comment: { type: String, required: true },
  screenshot: { type: String, },
  createdAt: { type: Date, required: true, default: Date.now },
}));
