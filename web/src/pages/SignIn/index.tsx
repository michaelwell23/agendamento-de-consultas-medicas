import React from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';

import logo from '../../assets/logo.png';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="logo" />

        <form>
          <h1>Faça seu Login</h1>

          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />

          <Button type="submit">Entrar</Button>

          <a href="/">Esqueci minha senha</a>
        </form>
        <a href="/">
          <FiLogIn />
          Cadastrar conta
        </a>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
