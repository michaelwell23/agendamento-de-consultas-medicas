import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticaUser = new AuthenticateUserService();

    const { user, token } = await authenticaUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.status(202).json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: (err as Error).message });
  }
});

export default sessionRouter;
