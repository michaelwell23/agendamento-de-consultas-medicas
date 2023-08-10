import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  fullName: string;
  cpf: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    fullName,
    cpf,
    email,
    password,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used', 401);
    }

    const hashPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      fullName,
      cpf,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export default CreateUserService;
