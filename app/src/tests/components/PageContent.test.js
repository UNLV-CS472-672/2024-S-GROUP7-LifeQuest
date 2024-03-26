import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavigationPanel from '../../components/NavigationPanel';

describe('PageContent', () => {
  it('applies given styles correctly', () => {
    const testProps = {
      pageContentHeight: '100vh',
      pageContentPosition: 'absolute',
      pageContentTop: '50px',
      pageContentLeft: '100px',
    };

    render(<PageContent {...testProps} />);

    const pageContent = screen.getByTestId('page-content');
    expect(pageContent).toHaveStyle({
      height: testProps.pageContentHeight,
      position: testProps.pageContentPosition,
      top: testProps.pageContentTop,
      left: testProps.pageContentLeft,
    });
  });
});
