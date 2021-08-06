import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import App from './App';
import theme from './theme';

render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="sm">
      <App />
    </Container>
  </ThemeProvider>,
  document.getElementById('root')
);
