import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageNotFound } from './page-not-found.screen';

test('renders learn react link', () => {
  render(<PageNotFound />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
