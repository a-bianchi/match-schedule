import React from 'react';
import { render, screen } from '@testing-library/react';
import { MatchPublicCreate } from './match-public-create.screen';

test('renders learn react link', () => {
  render(<MatchPublicCreate />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
