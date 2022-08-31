import React from 'react';
import { createContext } from 'react';

interface ContextProps {
  getPing: () => void;
}

export const UserContext = createContext({} as ContextProps);

export const UserProvider = ({ children }: any) => {
  const getPing = (): void => {
    console.log('API CALL');
  };

  return (
    <UserContext.Provider
      value={{
        getPing,
      }}>
      {children}
    </UserContext.Provider>
  );
};
