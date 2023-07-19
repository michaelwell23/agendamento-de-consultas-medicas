import React, { useCallback, useRef } from 'react';
import {
  FiArrowLeft,
  FiUser,
  FiCreditCard,
  FiMail,
  FiLock,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import logo from '../../assets/logo.png';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationError from '../../utils/getValidationErrors';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        fullName: Yup.string().required('Nome Completo obrigatório!'),
        cpf: Yup.string().required('CPF obrigatório!'),
        email: Yup.string()
          .required('E-mail obrigatório!')
          .email('Digite email válido'),
        password: Yup.string().min(6, 'No mínimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationError(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="+Clínica Saúde" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Cadastre-se</h1>

          <Input name="fullName" icon={FiUser} placeholder="Nome Completo" />
          <Input name="cpf" icon={FiCreditCard} placeholder="CPF" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>
        <a href="/">
          <FiArrowLeft />
          Voltar para Login
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
