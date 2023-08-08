import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/Repositories/UsersRepository';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const authenticaUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticaUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.status(202).json({ user, token });
});

export default sessionRouter;
