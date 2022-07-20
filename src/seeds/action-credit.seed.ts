import { ObjectId } from 'mongodb';

import ActionCredit from '../models/action-credit.model';
import { IActionCredit } from '../types';
import actionDetailFixtures from './action-detail.seed';
import userFixtures from './user.seed';

const [user1] = userFixtures;
const [actionDetail1, actionDetail2, actionDetail3] = actionDetailFixtures;

const fixtures: IActionCredit[] = [
  {
    _id: new ObjectId(),
    user: user1,
    action_detail: actionDetail1,
    value: 30,
  },
  {
    _id: new ObjectId(),
    user: user1,
    action_detail: actionDetail2,
    value: 20,
  },
  {
    _id: new ObjectId(),
    user: user1,
    action_detail: actionDetail3,
    value: 20,
  },
].map(actionCredit => new ActionCredit(actionCredit));

export default fixtures;
