// import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      fullName: 'John Doe',
      cpf: '12345698770',
      email: 'johndoe@example.com',
      password: '123456',
      provider: true, // Defina provider como true.
    });

    const user2 = await fakeUsersRepository.create({
      fullName: 'John Joe',
      cpf: '12345697890',
      email: 'johnjoe@example.com',
      password: '123456',
      provider: true, // Defina provider como true.
    });

    const loggedUser = await fakeUsersRepository.create({
      fullName: 'John Voe',
      cpf: '123456987',
      email: 'johnvoe@example.com',
      password: '123456',
      provider: false,
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
