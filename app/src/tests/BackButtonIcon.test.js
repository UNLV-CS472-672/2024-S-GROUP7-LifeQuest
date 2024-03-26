import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackButtonIcon from '../components/BackButtonIcon';

describe('BackButtonIcon', () => {
  it('renders the icon', () => {
    render(
      <BackButtonIcon
        groupIconWidth="50px"
        groupIconHeight="50px"
        groupIconPosition="absolute"
        groupIconTop="10px"
        groupIconRight="20px"
        groupIconBottom="30px"
        groupIconLeft="40px"
        groupIconMaxHeight="100%"
      />
    );
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', '/group.svg');
    expect(icon).toHaveStyle({
      width: '50px',
      height: '50px',
      position: 'absolute',
      top: '10px',
      right: '20px',
      bottom: '30px',
      left: '40px',
      maxHeight: '100%',
    });
  });
});
