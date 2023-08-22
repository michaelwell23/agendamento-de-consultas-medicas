import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/fakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTonkenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('resetPasswordServices', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeUserTonkenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeHashProvider,
      fakeUserRepository,
      fakeUserTonkenRepository,
    );
  });

  it('should be able to reset the password ', async () => {
    const user = await fakeUserRepository.create({
      fullName: 'Mark Lancaster',
      cpf: '4328764598',
      email: 'marklan@email.com.br',
      password: '123456',
    });

    const { token } = await fakeUserTonkenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHsh');

    await resetPassword.execute({
      password: '1234567',
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('1234567');
    expect(updatedUser?.password).toBe('1234567');
  });

  it('should not be able to reset the password with non-existign token', async () => {
    expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existign user', async () => {
    const { token } = await fakeUserTonkenRepository.generate(
      'non-existing-user',
    );

    expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset password if passed more than 1 hours', async () => {
    const user = await fakeUserRepository.create({
      fullName: 'Mark Lancaster',
      cpf: '4328764598',
      email: 'marklan@email.com.br',
      password: '123456',
    });

    const { token } = await fakeUserTonkenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 1);
    });

    await expect(
      resetPassword.execute({
        password: '1234567',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
