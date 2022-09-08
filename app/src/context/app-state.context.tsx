import React from 'react';
import { UserProvider } from './user.context';
import { AuthProvider } from './auth.context';
import { GlobalAlertProvider } from './global-alert.context';

// Wraps all providers that are created for the entire app
export const AppState = ({ children }: any) => {
  return (
    <GlobalAlertProvider>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </GlobalAlertProvider>
  );
};
