import mongoose from 'mongoose';

export interface IAction extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  action_detail: mongoose.Types.ObjectId;
}

export interface IActionPayload {
  user: string;
  action_detail: string;
}
