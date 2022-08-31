import React from 'react';
import { UserProvider } from './user.context';
import { AuthProvider } from './auth.context';

// Wraps all providers that are created for the entire app
export const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
};
