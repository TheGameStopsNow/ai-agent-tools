import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';

function render(ui: React.ReactElement, { ...renderOptions } = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render }; 