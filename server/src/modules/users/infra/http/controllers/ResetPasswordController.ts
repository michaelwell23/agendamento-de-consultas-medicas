import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class ResetPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswordController = container.resolve(ResetPasswordService);

    await resetPasswordController.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}

export default ResetPasswordController;
