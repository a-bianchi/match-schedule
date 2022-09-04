import { Navigate } from 'react-router-dom';
import { load } from '../utils/storage';
import { KeyNames } from '../utils/storage';

export const ProtectedRoute = ({ children }: any) => {
  const userToken = load(KeyNames.UserToken);
  if (!userToken || Object.keys(userToken).length === 0) {
    // user is not authenticated
    return <Navigate to="/" replace />;
  }
  return children;
};
