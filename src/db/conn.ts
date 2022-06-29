import mongoose, { Callback, Connection } from 'mongoose';

let dbConnection: Connection;

export default {
  connectToServer: function (callback: Callback<Connection>) {
    const connectionString = process.env.ATLAS_URI ?? '';
    mongoose.createConnection(connectionString, callback);
  },

  getDb: function () {
    return dbConnection;
  },
};
