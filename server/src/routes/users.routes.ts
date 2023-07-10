import { getRepository } from 'typeorm';
import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const {
      fullName,
      cpf,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      phone,
      email,
      password,
    } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      fullName,
      cpf,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      phone,
      email,
      password,
    });

    delete user.password;

    return response.status(202).json(user);
  } catch (err) {
    return response.status(400).json({ error: (err as Error).message });
  }
});

export default usersRouter;
