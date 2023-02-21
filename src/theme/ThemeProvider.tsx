import React from 'react';
import { PureLightTheme } from './schemes/PureLightTheme';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';

const ThemeProviderWrapper: React.FC = (props) => {
  const theme = PureLightTheme();
  return (
    <StylesProvider injectFirst={true}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
