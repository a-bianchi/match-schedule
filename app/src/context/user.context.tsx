import React, { useEffect } from 'react';
import { createContext } from 'react';
import api from '../services/api';

interface ContextProps {
  getPing: () => Promise<string | void>;
  getResponse: () => void;
}

export const UserContext = createContext({} as ContextProps);

export const UserProvider = ({ children }: any) => {
  const getPing = async (): Promise<string> => {
    const data = await api.getPing();

    return data.kind === 'ok' ? data.response : '';
  };

  const getResponse = (): void => {
    console.log('API CALL');
  };

  useEffect(() => {
    getPing().then(response => {
      console.log(`PING: ${response}`);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        getPing,
        getResponse,
      }}>
      {children}
    </UserContext.Provider>
  );
};
