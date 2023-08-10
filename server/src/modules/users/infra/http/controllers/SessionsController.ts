import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticaUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticaUser.execute({
      email,
      password,
    });

    // @ts-expect-error
    delete user.password;

    return response.status(202).json({ user, token });
  }
}

export default SessionsController;
