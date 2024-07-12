import { ThemeProvider } from "@mui/material";
import "./App.css";
import theme from "./themes/theme";
import { BrowserRouter } from "react-router-dom";
import MainRoute from "./routes/routes";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <MainRoute />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
