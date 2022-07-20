import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

import { User, ActionDetail } from '../../../src/models';

export default class ActionCreditGenerator {
  generateOne(override = {}) {
    return {
      _id: new ObjectId().toHexString(),
      user: new User()._id.toHexString(),
      action_detail: new ActionDetail()._id.toHexString(),
      value: faker.datatype.number(),
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
      user: new User()._id.toHexString(),
      action_detail: new ActionDetail()._id.toHexString(),
      value: faker.datatype.number(),
    };
  }
}
