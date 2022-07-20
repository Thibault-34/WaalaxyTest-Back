import { Router } from 'express';

import actionsRouter from './action.route';
import actionCreditsRouter from './action-credit.route';
import actionDetailRouter from './action-detail.route';
import userRouter from './user.route';

const router = Router();

router.get('/', (req, res) => res.send('Hello API'));
router.use('/actions', actionsRouter);
router.use('/action-credits', actionCreditsRouter);
router.use('/action-details', actionDetailRouter);
router.use('/users', userRouter);

export default router;
