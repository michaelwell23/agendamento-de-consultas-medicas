import React, { useCallback } from 'react';
import {
  FiArrowLeft,
  FiUser,
  FiCreditCard,
  FiMail,
  FiLock,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logo from '../../assets/logo.png';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async (data: object) => {
    try {
      const schema = Yup.object().shape({
        fullName: Yup.string().required('Nome Completo é obrigatório!'),
        cpf: Yup.string().required('CPF é obrigatório!'),
        email: Yup.string()
          .required('E-mail é obrigatório!')
          .email('Digite um email válido'),
        password: Yup.string().min(6, 'No mínimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="logo" />

        <Form onSubmit={handleSubmit}>
          <h1>Cadastre-se</h1>

          <Input
            name="name"
            icon={FiUser}
            type="text"
            placeholder="Nome Completo"
          />
          <Input name="cpf" icon={FiCreditCard} type="text" placeholder="CPF" />
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
          <a href="/">
            <FiArrowLeft />
            Voltar para Login
          </a>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUp;
