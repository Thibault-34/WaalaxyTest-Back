import mongoose, { Schema } from 'mongoose';

import { IActionDetail } from '../types';

const ActionDetailSchema = new Schema<IActionDetail>({
  name: {
    type: String,
    required: true,
    uppercase: true,
  },
  max_value: {
    type: Number,
    required: true,
    min: 0,
  },
});

export default mongoose.model<IActionDetail>('ActionDetail', ActionDetailSchema);
