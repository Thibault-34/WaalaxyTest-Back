import userFixtures from '../seeds/user.seed';
import actionDetailFixtures from '../seeds/action-detail.seed';
import actionFixtures from '../seeds/action.seed';
import actionCreditFixtures from '../seeds/action-credit.seed';

import User from '../models/user.model';
import ActionDetail from '../models/action-detail.model';
import Action from '../models/action.model';
import ActionCredit from '../models/action-credit.model';

export const seedDb = async () => {
  await User.deleteMany({});
  await User.insertMany(userFixtures);

  await Action.deleteMany({});
  await Action.insertMany(actionFixtures);

  await ActionCredit.deleteMany({});
  await ActionCredit.insertMany(actionCreditFixtures);

  await ActionDetail.deleteMany({});
  await ActionDetail.insertMany(actionDetailFixtures);
};
