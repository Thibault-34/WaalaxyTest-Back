import { ObjectId } from 'mongodb';

import ActionDetail from '../models/action-detail.model';
import { IActionDetail } from '../types';

const fixtures: IActionDetail[] = [
  { _id: new ObjectId(), name: 'ACTION A', max_value: 30 },
  { _id: new ObjectId(), name: 'ACTION B', max_value: 20 },
  { _id: new ObjectId(), name: 'ACTION C', max_value: 20 },
].map(actionDetail => new ActionDetail(actionDetail));

export default fixtures;
