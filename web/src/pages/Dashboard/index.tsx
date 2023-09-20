import React from 'react';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Calender,
} from './styles';

import logoImg from '../../assets/logo.png';
import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
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
        </Schedule>
        <Calender></Calender>
      </Content>
    </Container>
  );
};

export default Dashboard;
