import React from 'react';
import { AuthContext } from '../../context/auth.context';

export const Home = () => {
  const { logout } = React.useContext(AuthContext);
  return (
    <div className="App">
      <h1>Home</h1>
      <br />
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
      reprehenderit architecto accusamus quos enim odio. Reprehenderit
      perspiciatis esse et minus, eos non delectus? In vel quos magni
      consectetur quo officia!
      <button onClick={logout}>Logout</button>
    </div>
  );
};
