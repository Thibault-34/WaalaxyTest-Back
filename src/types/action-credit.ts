import mongoose, { Document } from 'mongoose';

export interface IActionCredit extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  action_detail: mongoose.Types.ObjectId;
  value: number;
}
