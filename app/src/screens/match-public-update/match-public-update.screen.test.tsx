import React from 'react';
import { render, screen } from '@testing-library/react';
import { MatchPublicUpdate } from './match-public-update.screen';

test('renders learn react link', () => {
  render(<MatchPublicUpdate />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
