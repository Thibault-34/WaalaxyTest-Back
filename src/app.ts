import 'dotenv/config';

import dbo from './services/database.service';
import Server from './services/server.service';
import { seedDb } from './services/fixtures.service';
import {
  UserActionsUpdatScheduler,
  UserCreditUpdateScheduler,
} from './services/schedulers.service';

class App {
  async init() {
    await dbo.connect();
    await seedDb();

    UserActionsUpdatScheduler.init();
    UserCreditUpdateScheduler.init();

    this.runServer();
  }

  runServer() {
    Server.init().run(({ port }) => {
      console.log(`Server run on port ${port}`);
    });
  }
}

export default App;
