import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders home screen title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Progress Bars Demo/i);
  expect(linkElement).toBeInTheDocument();
});
