import { Router } from 'express';

import ActionController from '../../controllers/action.controller';
import { IAction, IActionPayload } from '../../types';

const router: Router = Router();

router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const response = await new ActionController().getAllByUserId(user_id);
  if (!response) return res.status(404).send({ message: 'Not found' });
  res.send(response);
});

router.post('/', async (req, res) => {
  const actionPayload: IActionPayload = req.body;
  const quantity: number = req.query.quantity ? Number(req.query.quantity) : 1;
  const actions: IActionPayload[] = Array.from({ length: quantity }, () => actionPayload);
  const response = await new ActionController().createMany(actions);
  if (!response) return res.status(500).send({ message: 'Bad request' });
  res.send(response);
});

export default router;
