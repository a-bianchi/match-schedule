import React from 'react';
import { render, screen } from '@testing-library/react';
import { SignIn } from './signIn.screen';

test('renders learn react link', () => {
  render(<SignIn />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
