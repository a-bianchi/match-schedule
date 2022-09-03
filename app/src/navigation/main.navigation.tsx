import { Routes, Route } from 'react-router-dom';
import { Home, Match, SignIn } from '../screens';
import { MatchPublicView } from '../screens/match-public-view/match-public-view.screen';
import { SignUp } from '../screens/signUp/signUp.screen';
import { ProtectedRoute } from './protected.route';

export default function MainNavigation() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/match/create" element={<Match />} />
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
