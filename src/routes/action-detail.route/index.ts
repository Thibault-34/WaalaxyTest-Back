import { Router } from 'express';

import ActionDetailController from '../../controllers/action-detail.controller';

const router: Router = Router();

router.get('/', async (req, res) => {
  const { getAll } = new ActionDetailController();
  const response = await getAll();
  if (!response) return res.status(404).send({ message: 'Not found' });
  res.send(response);
});

export default router;
