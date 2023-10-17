import { renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../hooks/auth';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/apiClient';

const apiMook = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'user-1',
        fullName: 'Michael Wellington',
        cpf: '12345678909',
        email: 'michaelwellington@email.com',
      },
      token: 'tokeUser-123',
    };

    apiMook.onPost('sessions').reply(200, {
      apiResponse,
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'michaelwellington@email.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@+clinicaSaúde:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@+clinicaSaúde:user',
      JSON.stringify(apiResponse.user),
    );

    expect(result.current.user.email).toEqual('michaelwellington@email.com');
  });
});
