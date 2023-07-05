import { Router } from 'express';

const routes = Router();

import appointmentRouter from './appoitment.routes';

routes.use('/appointments', appointmentRouter);

export default routes;
