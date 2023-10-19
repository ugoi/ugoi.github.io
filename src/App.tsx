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
            {/* Default route that directs to the home page if not provided in routes' array */}
            <Route path="/" element={<Home />} />
            {/* 
              Dynamically generate AppBar routes based on the 'routes' array.
              Each route is linked to a specific component that's dynamically imported 
              based on the route name. 
            */}
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={React.createElement(
                  require(`./pages/${route.name}/${route.name}`).default,
                )}
              />
            ))}
            {/* Add additional routes not part of AppBar */}
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
