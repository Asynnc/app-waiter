import { model, Schema } from 'mongoose';

export const Feedback = model('Feedback', new Schema({
  user: { type: String, required: true },
  type: { type: String, required: true, enum: ['BUG', 'IDEA', 'OTHER'] },
  comment: { type: String, required: true },
  satisfaction: { type: String, required: false, enum: ['BAD', 'NEUTRAL', 'GOOD'], default: 'NEUTRAL' },
  screenshot: { type: String, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
}));
