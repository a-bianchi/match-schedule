import React from 'react';
import { UserProvider } from './user.context';

// Wraps all providers that are created for the entire app
export const AppState = ({ children }: any) => {
  return <UserProvider>{children}</UserProvider>;
};
