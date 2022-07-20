import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

export default class ActionDetailGenerator {
  generateOne(override = {}) {
    return {
      _id: new ObjectId().toHexString(),
      name: faker.datatype.string().toUpperCase(),
      max_value: faker.datatype.number(),
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
      name: faker.datatype.string(),
      max_value: faker.datatype.number(),
    };
  }
}
