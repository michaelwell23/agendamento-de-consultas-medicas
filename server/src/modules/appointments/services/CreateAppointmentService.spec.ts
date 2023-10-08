import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository; // Adicione esta linha

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
      fakeUsersRepository,
    );
  });

  it('should be able to create a new appoinment', async () => {
    const providerUser = await fakeUsersRepository.create({
      fullName: 'Provider User',
      cpf: '123456987',
      email: 'provider@example.com',
      password: '123456',
      provider: true,
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2023, 4, 10, 13),
      provider_id: providerUser.id,
      user_id: 'user_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(providerUser.id);
  });

  it('should not be able to create two appoinments on the same time', async () => {
    const providerUser = await fakeUsersRepository.create({
      fullName: 'Provider User',
      cpf: '123456987',
      email: 'provider@example.com',
      password: '123456',
      provider: true,
    });

    const appointmentDate = new Date(2023, 10, 12, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user_id',
      provider_id: providerUser.id,
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user_id',
        provider_id: providerUser.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appoinments on a past date', async () => {
    const providerUser = await fakeUsersRepository.create({
      fullName: 'Provider User',
      cpf: '123456987',
      email: 'provider@example.com',
      password: '123456',
      provider: true,
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2023, 4, 10, 11),
        provider_id: providerUser.id,
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appoinment with same as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2023, 4, 10, 13),
        provider_id: 'user_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appoinment before 8am and 5pm', async () => {
    const providerUser = await fakeUsersRepository.create({
      fullName: 'Provider User',
      cpf: '123456987',
      email: 'provider@example.com',
      password: '123456',
      provider: true, // Defina provider como true.
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2023, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2023, 4, 11, 7),
        provider_id: 'user_id',
        user_id: providerUser.id,
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2023, 4, 11, 18),
        provider_id: 'user_id',
        user_id: providerUser.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
