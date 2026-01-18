import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ruRU } from '@mui/x-data-grid/locales';
import { createTheme } from '@mui/material/styles';
import App from './app/App';
import './styles/global.less';

const theme = createTheme(
  {
    palette: { mode: 'light' },
    shape: { borderRadius: 10 },
    typography: { fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }
  },
  ruRU
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
