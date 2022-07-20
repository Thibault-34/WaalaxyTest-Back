import mongoose, { Mongoose } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

export default {
  getDb: () => {
    return mongoose.connection;
  },

  connect: async (): Promise<Mongoose> => {
    try {
      let connectionString = process.env.ATLAS_URI ?? '';

      if (process.env.NODE_ENV !== 'prod') {
        mongoServer = await MongoMemoryServer.create();
        connectionString = mongoServer.getUri();
      }

      return mongoose.connect(connectionString);
    } catch (error) {
      console.log(error);
      process.exit();
    }
  },

  disconnect: async (): Promise<void> => {
    try {
      await mongoose.connection.close();
      if (process.env.NODE_ENV !== 'prod') {
        await mongoServer.stop();
      }
    } catch (err) {
      console.log(err);
      process.exit();
    }
  },
};
