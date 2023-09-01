import { Router } from 'express';

import appointmentRouter from '@modules/appointments/infra/http/routes/appoitment.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
