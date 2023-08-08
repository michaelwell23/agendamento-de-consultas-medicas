import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppoitmentDTO';

export default interface IAppointmentsRepository {
  create(date: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(dat: Date): Promise<Appointment | undefined>;
}
