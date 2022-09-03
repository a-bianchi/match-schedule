import React from 'react';
import { render, screen } from '@testing-library/react';
import { MatchPublicView } from './match-public-view.screen';

test('renders learn react link', () => {
  render(<MatchPublicView />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
