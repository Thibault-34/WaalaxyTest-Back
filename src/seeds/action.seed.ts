import { ObjectId } from 'mongodb';

import Action from '../models/action.model';
import { IAction } from '../types';
import userFixtures from './user.seed';
import actionDetailFixtures from './action-detail.seed';

const [user1] = userFixtures;
const [actionDetail1, actionDetail2, actionDetail3] = actionDetailFixtures;

const fixtures: IAction[] = [
  { _id: new ObjectId(), user: user1, action_detail: actionDetail1 },
  { _id: new ObjectId(), user: user1, action_detail: actionDetail2 },
  { _id: new ObjectId(), user: user1, action_detail: actionDetail3 },
].map(action => new Action(action));

export default fixtures;
