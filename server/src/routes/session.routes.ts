import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticaUser = new AuthenticateUserService();

  const { user, token } = await authenticaUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.status(202).json({ user, token });
});

export default sessionRouter;
