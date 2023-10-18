import React from "react";
import App from "./App";

// Create a mock implementation of createRoot.
const mockRender = jest.fn();
jest.mock("react-dom/client", () => ({
  createRoot: jest.fn().mockImplementation(() => ({
    render: mockRender,
  })),
}));

describe("Application root", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);

    // Instead of 'require', use ES6 'import' to bring in the index file.
    // However, since this is a test, we will assume that merely running the above code
    // should trigger the index.tsx rendering logic. If you were using ES6 modules throughout,
    // you'd use dynamic imports. With CommonJS, 'require' is acceptable.
    require("./index.tsx");

    // Check if the render method of the created root was called with the correct parameters.
    expect(mockRender).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );

    // Cleanup added div.
    document.body.removeChild(div);
  });
});
