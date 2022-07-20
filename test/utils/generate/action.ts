import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

import { User, ActionDetail } from '../../../src/models';
import UserGenerator from './user';
import ActionDetailGenerator from './action-detail';

export default class ActionGenerator {
  generateOne(override = {}) {
    return {
      _id: new ObjectId().toHexString(),
      user: new UserGenerator().generateOne()._id,
      action_detail: new ActionDetailGenerator().generateOne()._id,
      __v: 0,
      ...override,
    };
  }

  generateMany(n: number = 1) {
    return Array.from(
      {
        length: n,
      },
      (_, i) => {
        return this.generateOne();
      },
    );
  }

  generatePayload() {
    return {
      user: new UserGenerator().generateOne()._id,
      action_detail: new ActionDetailGenerator().generateOne(),
    };
  }
}
