import mongoose, { Schema } from 'mongoose';

import { IAction } from '../types';

const ActionSchema = new Schema<IAction>({
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
});

export default mongoose.model<IAction>('Action', ActionSchema);
