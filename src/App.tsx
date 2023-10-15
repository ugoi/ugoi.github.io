import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar/ResponsiveAppBar";
import routes from "./routesConfig";
import Home from "./pages/Home/Home";
import { CssBaseline, useMediaQuery } from "@mui/material";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode],
  );
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ResponsiveAppBar data-testid="responsive-app-bar" routes={routes} />
          <Routes>
            <Route path="/" element={<Home />} />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={React.createElement(
                  require(`./pages/${route.name}/${route.name}`).default,
                )}
              />
            ))}
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
