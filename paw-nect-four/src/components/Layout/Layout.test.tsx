
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from './Layout';  

//I'm not sure if I need matchmediamock yet, but it's here.

describe('Layout Component Responsiveness', () => {
  const resizeWindow = (width: number, height: number) => {
    window.innerWidth = width;
    window.innerHeight = height;
    window.dispatchEvent(new Event('resize'));
  };

  test('renders correctly in large screen sizes (e.g., desktop)', () => {
    resizeWindow(1024, 768); // Simulate a desktop screen size
    render(<Layout />);
    
    // Check if the layout is displayed with the necessary elements
    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
  });

  test('renders correctly in small screen sizes (e.g., mobile)', () => {
    resizeWindow(375, 667); // Simulate a mobile screen size
    render(<Layout />);
    
    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

  });
});
