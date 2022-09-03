import React from 'react';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SigninResponse } from '../interfaces';
import { clear, save } from '../utils/storage';
import { KeyNames } from '../utils/storage';

interface ContextProps {
  login: (data: SigninResponse) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const login = (data: SigninResponse): void => {
    save(KeyNames.UserToken, data);
    navigate('/home');
  };

  const logout = (): void => {
    clear();
    navigate('/', { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
