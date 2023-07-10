import { Router } from 'express';

const routes = Router();

import appointmentRouter from './appoitment.routes';
import usersRouter from './users.routes';

routes.use('/appointments', appointmentRouter);
routes.use('/users', usersRouter);

export default routes;
