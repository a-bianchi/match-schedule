import { Routes, Route } from 'react-router-dom';
import { NavigationBar } from '../components';
import { Footer } from '../components/footer/footer.components';
import {
  Home,
  MatchPublicCreate,
  MatchPublicUpdate,
  PageNotFound,
  SignIn,
} from '../screens';
import { MatchPublicView } from '../screens/match-public-view/match-public-view.screen';
import { SignUp } from '../screens/signUp/signUp.screen';
import { ProtectedRoute } from './protected.route';

export default function MainNavigation() {
  // TODO: NavigationBar tiene que ser un componente que se renderice en algunas pantallas
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavigationBar />
            <MatchPublicCreate />
            <Footer />
          </>
        }
      />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/match/create" element={<MatchPublicCreate />} />
      <Route
        path="/match/update/:id"
        element={
          <>
            <NavigationBar />
            <MatchPublicUpdate />
          </>
        }
      />
      <Route
        path="/match/view/:id"
        element={
          <>
            <NavigationBar />
            <MatchPublicView />
          </>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
