import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();

const listProviders = new ProvidersController();
const providerMonthAvailability = new ProviderMonthAvailabilityController();
const providerDayAvailability = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);
providersRouter.get('/', listProviders.index);

providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailability.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailability.index,
);

export default providersRouter;
