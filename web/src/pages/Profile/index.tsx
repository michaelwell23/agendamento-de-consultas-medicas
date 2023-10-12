import React, { ChangeEvent, useCallback, useRef } from 'react';
import {
  FiUser,
  FiCreditCard,
  FiMail,
  FiLock,
  FiCamera,
  FiArrowLeft,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/apiClient';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationError from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  fullName: string;
  email: string;
  cpf: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, updateUser } = useAuth();

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          fullName: Yup.string().required('Nome Completo obrigatório!'),
          cpf: Yup.string(),
          email: Yup.string()
            .required('E-mail obrigatório!')
            .email('Digite email válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.number(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.number(),
            })
            .oneOf([Yup.ref('password')], 'Confirmação de senha incorreta.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          fullName,
          email,
          cpf,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          fullName,
          email,
          cpf,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Perfil Atualizado com Sucesso!',
          description: 'Suas informações de perfil foram atualizada!.',
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Error ao atualizar o perfil',
          description: 'Verifique os campos e tente novamente',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then((response) => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            fullName: user.fullName,
            cpf: user.cpf,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.fullName} />
            <label htmlFor="avatar">
              <FiCamera />

              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Editar Perfil</h1>
          <Input name="fullName" icon={FiUser} placeholder="Nome Completo" />
          <Input name="cpf" icon={FiCreditCard} placeholder="CPF" disabled />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />
          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />

          <Button type="submit">Salvar Alterações</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
