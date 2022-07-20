import mongoose from 'mongoose';

import ActionCreditController from './action-credit.controller';
import User from '../models/user.model';
import {
  UserActionsUpdatScheduler,
  UserCreditUpdateScheduler,
} from '../services/schedulers.service';

import { IUser, IUserPayload } from '../types';

export default class UserController {
  public async getAll(): Promise<IUser[] | null> {
    try {
      return await User.find();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async get(name: string): Promise<IUser | null> {
    try {
      return await User.findOne({ name });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(id: string, payload: {}): Promise<IUser[] | null> {
    try {
      return await User.findByIdAndUpdate(id, payload);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async create(payload: IUserPayload): Promise<IUser | null> {
    try {
      const user = await User.create({
        ...payload,
        last_credit_update: Date.now(),
      });

      await new ActionCreditController().updateUserCreditsValues(
        new mongoose.Types.ObjectId(user._id),
      );

      UserActionsUpdatScheduler.instance?.setScheduler(user._id.toString());
      UserCreditUpdateScheduler.instance?.setScheduler(user._id.toString());

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
