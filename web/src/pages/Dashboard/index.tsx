import React, { useCallback, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Calender,
  Section,
  Appointment,
} from './styles';

import logoImg from '../../assets/logo.png';
import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="+Clinica Saúde Logo" />

          <Profile>
            <img src={user.avatar_url} alt={user.fullName} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.fullName}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>AGENDAMENTOS</h1>
          <p>
            <span>Hoje</span>
            <span>dia 06,</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppointment>
            <strong>Próximo atendimento</strong>
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSR-dez27VzWPTKhNi5kQf-aNDxuBo1LQ1-Q&usqp=CAU"
                alt="Marcos Sóbis"
              />

              <strong>Marcos Sóbis</strong>
              <span>
                <FiClock /> 08:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock /> 08:00
              </span>
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSR-dez27VzWPTKhNi5kQf-aNDxuBo1LQ1-Q&usqp=CAU"
                  alt="Marcos Sóbis"
                />

                <strong>Marcos Sóbis</strong>
                <span>
                  <FiClock /> 08:00
                </span>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock /> 08:00
              </span>
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSR-dez27VzWPTKhNi5kQf-aNDxuBo1LQ1-Q&usqp=CAU"
                  alt="Marcos Sóbis"
                />

                <strong>Marcos Sóbis</strong>
                <span>
                  <FiClock /> 08:00
                </span>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock /> 08:00
              </span>
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSR-dez27VzWPTKhNi5kQf-aNDxuBo1LQ1-Q&usqp=CAU"
                  alt="Marcos Sóbis"
                />

                <strong>Marcos Sóbis</strong>
                <span>
                  <FiClock /> 08:00
                </span>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calender>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
            }}
            // onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calender>
      </Content>
    </Container>
  );
};

export default Dashboard;
