import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from '.';

test('renders with valid props', () => {
    render(<ProgressBar barColor="#000" barWidth="100" />);
  
    expect(screen.getByText('100%'))

});