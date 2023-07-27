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
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.png';

import api from '../../services/apiClient';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationError from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

import { Container, Content, Background, AnimationContainer } from './styles';

interface SignUpFormData {
  name: String;
  email: String;
  cpf: string;
  password: String;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
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

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realidado com sucesso!',
          description:
            'Utilize o seu email e senha para acesso, na página de login.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'error ao realizar o seu cadastro',
          description: 'Verifique os campos e tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
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

          <Link to="/">
            <FiArrowLeft />
            Voltar para Login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
