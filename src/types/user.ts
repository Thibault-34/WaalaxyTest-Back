import mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  last_credit_update: number;
}

export interface IUserPayload {
  name: string;
}
