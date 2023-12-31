import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { fullName, cpf, email, password } = request.body;
      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        fullName,
        cpf,
        email,
        password,
      });

      return response.status(202).json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: (err as Error).message });
    }
  }
}

export default UsersController;
