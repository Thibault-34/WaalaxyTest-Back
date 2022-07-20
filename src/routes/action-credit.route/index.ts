import { Router } from 'express';

import ActionCreditController from '../../controllers/action-credit.controller';

const router: Router = Router();

router.get('/:user_id', async (req, res) => {
  const { getAllByUserId } = new ActionCreditController();
  const response = await getAllByUserId(req.params.user_id);
  if (!response) return res.status(404).send({ message: 'Not found' });
  res.send(response);
});

export default router;
