import mongoose from 'mongoose';

import Action from '../models/action.model';
import ActionCreditController from './action-credit.controller';
import { asyncEvery } from '../utils';

import { IAction, IActionPayload } from '../types';

export default class ActionController {
  public async getAllByUserId(user: string): Promise<IAction[] | null> {
    try {
      return await Action.find({
        user: new mongoose.Types.ObjectId(user),
      })
        .sort({ _id: 1 })
        .populate('action_detail');
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async createMany(payload: IActionPayload[]): Promise<IAction[] | null> {
    try {
      const actions: IAction[] = payload.map(actionPayload => new Action(actionPayload));

      await Action.insertMany(actions);

      const populatedActions = await Promise.all(
        actions.map(async action => await action.populate('action_detail')),
      );

      return populatedActions;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string) {
    return await Action.findOneAndDelete({ _id: id });
  }

  public async useNextUserAction(userId: mongoose.Types.ObjectId, callback?: () => void) {
    const userActions = await new ActionController().getAllByUserId(userId.toString());

    if (userActions) {
      await asyncEvery(userActions, async userAction => {
        const userActionCredit = await new ActionCreditController().get(
          userId,
          userAction.action_detail,
        );

        if ((userActionCredit?.value ?? 0) > 0) {
          try {
            await this.delete(userAction._id.toString());
            await new ActionCreditController().decreaseCredit(userId, userAction.action_detail);
            callback?.();
          } catch (error) {
            console.error(error);
          }
          return false;
        }
        return true;
      });
    }
  }
}
