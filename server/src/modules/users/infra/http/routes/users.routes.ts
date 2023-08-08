import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/uploads';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpadateUserAvatarServices';

import UsersRepository from '../../typeorm/Repositories/UsersRepository';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { fullName, cpf, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({
      fullName,
      cpf,
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
    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.status(202).json(user);
  },
);

export default usersRouter;
