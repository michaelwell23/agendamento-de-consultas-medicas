import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/fakeUserTokenRepository';

let fakeUserRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTonkenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('sendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTonkenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeMailProvider,
      fakeUserRepository,
      fakeUserTonkenRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      fullName: 'Mark Lancaster',
      cpf: '4328764598',
      email: 'marklan@email.com.br',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'marklan@email.com.br',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'marklan@email.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTonkenRepository, 'generate');

    const user = await fakeUserRepository.create({
      fullName: 'Mark Lancaster',
      cpf: '4328764598',
      email: 'marklan@email.com.br',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'marklan@email.com.br',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
