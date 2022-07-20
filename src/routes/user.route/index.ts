import { Router } from 'express';

import UserController from '../../controllers/user.controller';
import { IUser, IUserPayload } from '../../types';

const router: Router = Router();

router.get('/:user_name', async (req, res) => {
  const { user_name } = req.params;
  const response = await new UserController().get(user_name);
  if (!response) return res.status(404).send({ message: 'Not found' });
  res.send(response);
});

router.post('/', async (req, res) => {
  const userPayload: IUserPayload = req.body;
  const response = await new UserController().create(userPayload);
  if (!response) return res.status(500).send({ message: 'Bad request' });
  res.send(response);
});

export default router;
