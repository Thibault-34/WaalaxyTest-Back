import mongoose, { Schema } from 'mongoose';

import { IUser } from '../types';

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  last_credit_update: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IUser>('User', UserSchema);
