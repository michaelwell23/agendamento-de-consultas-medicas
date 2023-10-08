import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;
let usersRepository: FakeUsersRepository;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    usersRepository = new FakeUsersRepository();

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
      usersRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    const user = await usersRepository.create({
      fullName: 'Provider User',
      cpf: '12345678990',
      email: 'provider@example.com',
      password: 'password',
      provider: true, // Set provider to true
    });

    await fakeAppointmentsRepository.create({
      provider_id: user.id, // Use user.id as the provider_id
      user_id: '2',
      date: new Date(2023, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: user.id, // Use user.id as the provider_id
      user_id: '2',
      date: new Date(2023, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: user.id, // Use user.id as the provider_id
      day: 20,
      year: 2023,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
