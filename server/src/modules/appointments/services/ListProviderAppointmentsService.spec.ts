import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
      fakeUsersRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    // Crie um usuário provedor
    const providerUser = await fakeUsersRepository.create({
      fullName: 'Provider User',
      cpf: '123456987',
      email: 'provider@example.com',
      password: '123456',
      provider: true, // Defina provider como true.
    });

    // Crie os agendamentos pertencentes ao provedor
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: providerUser.id, // Use o ID do usuário provedor.
      user_id: '56789',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: providerUser.id, // Use o ID do usuário provedor.
      user_id: '56789',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    // Liste os agendamentos para o provedor
    const availability = await listProviderAppointments.execute({
      provider_id: providerUser.id, // Use o ID do usuário provedor.
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual([appointment1, appointment2]);
  });
});
