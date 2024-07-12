import { ThemeProvider } from '@mui/material';
import './App.css';
import theme from './themes/theme';
import { BrowserRouter } from 'react-router-dom';
import MainRoute from './routes/routes';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MainRoute />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
