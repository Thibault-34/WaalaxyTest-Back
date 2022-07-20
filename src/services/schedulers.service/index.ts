import mongoose from 'mongoose';

import UserController from '../../controllers/user.controller';
import ActionController from '../../controllers/action.controller';
import ActionCreditController from '../../controllers/action-credit.controller';
import JobScheduler from '../../utils/JobScheduler';

import { IUser } from '../../types';

export class UserActionsUpdatScheduler {
  public static instance: JobScheduler | undefined;

  public static async init() {
    const job = async (userId: string) => {
      await new ActionController().useNextUserAction(new mongoose.Types.ObjectId(userId), () => {
        UserCreditUpdateScheduler.instance?.resetScheduler(userId);
        console.info(`userCreditUpdateScheduler: reset ${userId}`);
      });
    };
    const jobScheduler = new JobScheduler(job, 2 * 60 * 1000);

    new UserController().getAll().then((users: IUser[] | null) => {
      users?.forEach(async user => {
        const jobTimestamp = jobScheduler.getNextTimestamp(user.last_credit_update);
        jobScheduler.setScheduler(user._id.toString(), jobTimestamp);
      });
    });

    this.instance = jobScheduler;
  }
}

export class UserCreditUpdateScheduler {
  public static instance: JobScheduler | undefined;

  public static async init() {
    const job = async (userId: string) => {
      const newCredits = await new ActionCreditController().updateUserCreditsValues(
        new mongoose.Types.ObjectId(userId),
      );
      console.info(`Update credits of user ${userId}`, newCredits);
    };
    const jobScheduler = new JobScheduler(job);

    new UserController().getAll().then((users: IUser[] | null) => {
      users?.forEach(async user => {
        const jobTimestamp = jobScheduler.getNextTimestamp(user.last_credit_update);
        jobScheduler.setScheduler(user._id.toString(), jobTimestamp);
      });
    });

    this.instance = jobScheduler;
  }
}
