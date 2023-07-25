import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

import ToastContainer from '../components/ToastContainer';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
      <ToastContainer />
    </AuthProvider>
  );
};

export default AppProvider;
