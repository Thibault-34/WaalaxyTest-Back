import mongoose from 'mongoose';

import ActionDetailController from './action-detail.controller';
import ActionCredit from '../models/action-credit.model';
import { ActionDetail } from '../models';

import { IActionCredit, IActionDetail } from '../types';

export default class ActionCreditController {
  public async getAllByUserId(user: string): Promise<IActionCredit[] | null> {
    try {
      return await ActionCredit.find({
        user: new mongoose.Types.ObjectId(user),
      }).populate('action_detail');
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async get(
    userId: mongoose.Types.ObjectId,
    actionDetailId: mongoose.Types.ObjectId,
  ): Promise<IActionCredit | null> {
    try {
      return await ActionCredit.findOne({ user: userId, action_detail: actionDetailId });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string): Promise<IActionCredit | null> {
    try {
      return await ActionCredit.findOneAndDelete({ _id: id });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async decreaseCredit(
    userId: mongoose.Types.ObjectId,
    actionDetailId: mongoose.Types.ObjectId,
  ): Promise<IActionCredit | null> {
    try {
      const actionCredit = await ActionCredit.findOne({
        user: userId,
        action_detail: actionDetailId,
      });
      if (actionCredit) {
        actionCredit.value--;
        actionCredit.save();
      }
      return actionCredit;
    } catch (error) {
      return null;
    }
  }

  public async updateAllByUserId(user: string, fields: Object): Promise<IActionCredit[] | null> {
    try {
      ActionCredit.updateMany({ user }, fields);

      return ActionCredit.find({ user });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async updateUserCreditsValues(
    user: mongoose.Types.ObjectId,
  ): Promise<IActionCredit[] | null> {
    try {
      const actionDetails = (await new ActionDetailController().getAll()) ?? [];

      for (let actionDetail of actionDetails) {
        await ActionCredit.updateOne(
          { user, action_detail: actionDetail },
          {
            user,
            action_detail: actionDetail,
            value: Math.floor(actionDetail.max_value * (1 - Math.random() * 0.2)),
          },
          { upsert: true, new: true },
        );
      }

      return await ActionCredit.find({ user });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
