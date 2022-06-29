import 'dotenv/config';
import express, {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from 'express';
import cors from 'cors';
import dbo from './db/conn';

const PORT: Number = Number(process.env.PORT) || 5000;
const app: express.Express = express();

app.use(cors());
app.use(express.json());

const errorRequestHandler: ErrorRequestHandler = (
  err: { stack: any },
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};

app.use(errorRequestHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

dbo.connectToServer(err => {
  if (err) {
    console.error(err);
    process.exit();
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
