import React from 'react';
import { createContext } from 'react';
import api from '../services/api';

interface ContextProps {
  getPing: () => Promise<string | void>;
}

export const UserContext = createContext({} as ContextProps);

export const UserProvider = ({ children }: any) => {
  const getPing = async (): Promise<string> => {
    const data = await api.getPing();
    return data.kind === 'ok' ? data.response : '';
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
