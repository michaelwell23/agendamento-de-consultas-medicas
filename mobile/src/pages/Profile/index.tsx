/* eslint-disable import/extensions */
import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import * as Yup from 'yup';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationError from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Title,
  Header,
  BackButton,
  SignOutButton,
  UserAvatarButton,
  UserAvatar,
} from './styles';

interface signUpFormData {
  fullname: string;
  cpf: string;
  email: string;
  oldPassword: string;
  password: string;
  confirmPasswordInputRef: string;
}

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const cpfInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: signUpFormData) => {
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

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode realizar o seu login',
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente',
        );
      }
    },
    [navigation],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSignOut = useCallback(() => {}, []);

  const handleUpdateAvatar = useCallback(() => {}, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <Header>
              <BackButton onPress={handleGoBack}>
                <Icon name="chevron-left" size={24} color="#94de5e" />
              </BackButton>
              <SignOutButton onPress={handleSignOut}>
                <Icon name="log-out" size={24} color="#94de5e" />
              </SignOutButton>
            </Header>

            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
              <Title>Meu Perfil</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="fullName"
                icon="user"
                placeholder="Nome Completo"
                returnKeyType="next"
                onSubmitEditing={() => {
                  cpfInputRef.current?.focus();
                }}
              />
              <Input
                ref={cpfInputRef}
                name="cpf"
                icon="credit-card"
                placeholder="CPF"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                name="email"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={oldPasswordInputRef}
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={confirmPasswordInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar Nova Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Confirmar Alterações
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
