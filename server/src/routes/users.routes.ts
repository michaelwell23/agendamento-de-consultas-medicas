import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/uploads';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpadateUserAvatarServices';

const usersRouter = Router();
const upload = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      delete user.password;

      return response.status(202).json(user);
    } catch (err) {
      return response.status(400).json({ error: (err as Error).message });
    }
  },
);

export default usersRouter;
