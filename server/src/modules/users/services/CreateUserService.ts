import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface Request {
  fullName: string;
  cpf: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    fullName,
    cpf,
    email,
    password,
  }: Request): Promise<User> {
    const userRespository = getRepository(User);

    const checkUserExists = await userRespository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used', 401);
    }

    const hashPassword = await hash(password, 8);

    const user = userRespository.create({
      fullName,
      cpf,
      email,
      password: hashPassword,
    });

    await userRespository.save(user);

    return user;
  }
}

export default CreateUserService;
