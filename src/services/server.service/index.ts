import express from 'express';
import cors from 'cors';
import * as http from 'http';

import router from '../../routes';
import { BooleanExpression } from 'mongoose';

interface IServerConfig {
  port: number;
  hostname?: string;
  backlog?: number;
}

const error500RequestHandler: express.ErrorRequestHandler = (
  err: { stack: any },
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};

const error404RequestHandler: express.RequestHandler = (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.status(404).send('Sorry cant find that!');
};

export default class Server {
  static express: express.Express | undefined;
  static instance: http.Server | undefined;
  static config: IServerConfig = {
    port: Number(process.env.PORT) || 5000,
  };

  static init(config: { withRoutes: Boolean } = { withRoutes: true }) {
    const app: express.Express = express();

    app.use(cors());
    app.use(express.json());
    app.use(error500RequestHandler);
    if (config.withRoutes) {
      app.use('/api', router);
      app.use('*', error404RequestHandler);
    }

    Server.express = app;

    return Server;
  }

  static configure(callback: (express: express.Express) => void) {
    if (Server.express) callback(Server.express);

    return Server;
  }

  static run(callback?: (serverConfig: IServerConfig) => void) {
    const serverConfigArgs = Object.values(Server.config);
    Server.instance = Server.express?.listen(...serverConfigArgs, () =>
      callback?.(Server.config),
    );

    return Server;
  }
}
