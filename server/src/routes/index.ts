import { Router } from 'express';

const routes = Router();

import appointmentRouter from './appoitment.routes';
import usersRouter from './users.routes';
import sessionRouter from './session.routes';

routes.use('/appointments', appointmentRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);

export default routes;
