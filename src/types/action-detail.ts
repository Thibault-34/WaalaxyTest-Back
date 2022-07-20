import mongoose from 'mongoose';

export interface IActionDetail extends mongoose.Document {
  name: String;
  max_value: number;
}
