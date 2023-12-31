import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      fullName: 'John Doe',
      cpf: '12345678909',
      email: 'johndoe@example.com',
      password: '123456',
      provider: false,
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.fullName).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-exisiting-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
