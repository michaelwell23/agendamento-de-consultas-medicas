import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsController = new SessionsController();
const sessionRouter = Router();

sessionRouter.post('/', sessionsController.create);

export default sessionRouter;
