import { Navigate } from 'react-router-dom';
import { SigninResponse } from '../interfaces';
import { load } from '../utils/storage';
import { KeyNames } from '../utils/storage';

export const ProtectedRoute = ({ children }: any) => {
  const userToken = load(KeyNames.UserToken);
  if (!userToken && userToken !== null) {
    const { access_token } = userToken as SigninResponse;
    if (access_token) {
      // user is not authenticated
      return <Navigate to="/" />;
    }
  }
  return children;
};
