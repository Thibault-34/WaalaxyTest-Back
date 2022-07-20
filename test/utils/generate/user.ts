import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

export default class UserGenerator {
  generateOne(override = {}) {
    return {
      _id: new ObjectId().toHexString(),
      name: faker.name.firstName().toLowerCase(),
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
      name: faker.name.firstName(),
    };
  }
}
