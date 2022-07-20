import { ObjectId } from 'mongodb';

import User from '../models/user.model';
import { IUser } from '../types';

const fixtures: IUser[] = [
  {
    _id: new ObjectId("62d691d5599fface86d0b6a6"),
    name: 'Thibault',
    last_credit_update: Date.now() - 3 * 1000,
  },
  {
    _id: new ObjectId(),
    name: 'John',
    last_credit_update: Date.now(),
  },
].map(user => new User(user));

console.info(`Main user is: ${fixtures[0]._id}`);

export default fixtures;
