import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import routes from "../../routesConfig";
import mockRoutes from "../../routesConfig";

describe("ResponsiveAppBar Component", () => {
  test("ResponsiveAppBar is rendered", () => {
    render(
      <MemoryRouter>
        <ResponsiveAppBar
          routes={routes}
          logo={{ name: "Stefan", path: "/" }}
        />
      </MemoryRouter>,
    );
  });
});
