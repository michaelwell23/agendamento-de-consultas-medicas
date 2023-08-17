import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentSevice';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const FakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      FakeAppointmentRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const FakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      FakeAppointmentRepository,
    );

    const appointmentDate = new Date(2023, 9, 23, 10);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
