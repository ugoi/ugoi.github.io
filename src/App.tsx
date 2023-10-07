import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar/ResponsiveAppBar";
import routes from "./routesConfig";
import Home from "./pages/Home/Home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Router>
          <ResponsiveAppBar
            routes={routes}
            logo={{ name: "Stefan", path: "/" }}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={React.createElement(
                  require(`./pages/${route.component}/${route.component}`)
                    .default,
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
