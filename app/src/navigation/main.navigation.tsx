import { Routes, Route } from 'react-router-dom';
import { Home, MatchPublicCreate, MatchPublicUpdate, SignIn } from '../screens';
import { MatchPublicView } from '../screens/match-public-view/match-public-view.screen';
import { SignUp } from '../screens/signUp/signUp.screen';
import { ProtectedRoute } from './protected.route';

export default function MainNavigation() {
  return (
    <Routes>
      <Route path="/" element={<MatchPublicCreate />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/match/create" element={<MatchPublicCreate />} />
      <Route path="/match/update/:id" element={<MatchPublicUpdate />} />
      <Route path="/match/view/:id" element={<MatchPublicView />} />
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
