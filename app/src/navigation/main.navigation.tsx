import { Routes, Route } from 'react-router-dom';
import { Home, SignIn } from '../screens';
import { SignUp } from '../screens/signUp/signUp.screen';
import { ProtectedRoute } from './protected.route';

export default function MainNavigation() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
