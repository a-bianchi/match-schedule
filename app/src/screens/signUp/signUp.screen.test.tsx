import React from 'react';
import { render, screen } from '@testing-library/react';
import { SignUp } from './signUp.screen';

test('renders learn react link', () => {
  render(<SignUp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
