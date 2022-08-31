import { Routes, Route } from 'react-router-dom';
import { Home, SignIn } from '../screens';
import { ProtectedRoute } from './protected.route';

export default function MainNavigation() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
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
