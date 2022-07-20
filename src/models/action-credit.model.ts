import mongoose, { Schema } from 'mongoose';

import { IActionCredit } from '../types';

const ActionCreditSchema = new Schema<IActionCredit>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action_detail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ActionDetail',
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IActionCredit>('ActionCredit', ActionCreditSchema);
