import { Request, Response } from 'express';

import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,

      // @ts-expect-error
      avatarFilename: request.file.filename,
    });

    // @ts-expect-error
    delete user.password;

    return response.status(202).json(user);
  }
}

export default UserAvatarController;
