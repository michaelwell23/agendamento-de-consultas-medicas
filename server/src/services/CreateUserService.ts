import { getRepository } from 'typeorm';

import User from '../models/User';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
interface Request {
  fullName: String;
  cpf: String;
  dateOfBirth: Date;
  gender: String;
  address: String;
  city: String;
  state: String;
  phone: String;
  email: String;
  password: String;
}

class CreateUserService {
  public async execute({
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
      dateOfBirth,
      gender,
      address,
      city,
      state,
      phone,
      email,
      password: hashPassword,
    });

    await userRespository.save(user);

    return user;
  }
}

export default CreateUserService;
