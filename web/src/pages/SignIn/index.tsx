/* eslint-disable no-console */
import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';

import { useAuth } from '../../hooks/AuthContext';
import getValidationError from '../../utils/getValidationErrors';

import logo from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

interface SigInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, signIn } = useAuth();

  console.log(user);

  const handleSubmit = useCallback(
    async (data: SigInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório!')
            .email('Digite email válido'),
          password: Yup.string().required('Senha obrigatória!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const errors = getValidationError(err);

        formRef.current?.setErrors(errors);
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="logo" />

        <Form ref={formRef} onSubmit={handleSubmit}>
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
        </Form>
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
