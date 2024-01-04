import { render, screen, waitFor } from "@testing-library/react";
import { auth } from "../../firebase-config";
import Chat from "./Chat";

// Mock the auth module
jest.mock("../../firebase-config");

jest.mock("../../components/Auth/Auth", () => ({
  Auth: () => <div data-testid="auth">mocked child1</div>,
}));

jest.mock("../../components/ChatComponent/ChatComponent.tsx", () => ({
  ChatComponent: () => <div data-testid="chatComponent">mocked child1</div>,
}));

jest.mock("../../components/LogoutComponent/LogoutComponent.tsx", () => ({
  LogoutComponent: () => <div data-testid="logoutComponent">mocked child1</div>,
}));

describe("<Chat />", () => {
  test("displays loading text when auth state is changing", async () => {
    auth.onAuthStateChanged.mockImplementation((callback) => {
      // Simulate a delay before calling the callback
      setTimeout(() => {
        callback(null); // Simulate no user logged in
      }, 500); // Delay of 1000 milliseconds (1 second)

      // Return a mock unsubscribe function
      return jest.fn();
    });

    // // Set up the mock to call the callback with null first (loading state)
    // Render the component
    render(<Chat />);
    // Check that the loading text is displayed
    expect(screen.queryByText("Loading...")).toBeInTheDocument();
    // // // Then set up the mock to call the callback with a user object (logged in state)
    // // mockOnAuthStateChanged.mockImplementationOnce((callback) => callback({}));
    // Use waitFor to wait for the loading text to disappear
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument(),
    );
    // });
  });
  it("renders Chat component", () => {
    auth.onAuthStateChanged.mockImplementation((callback) => {
      // Simulate a delay before calling the callback
      callback(false); // Simulate no user logged in

      // Return a mock unsubscribe function
      return jest.fn();
    });
    render(<Chat />);
    expect(screen.getByTestId("auth")).toBeInTheDocument();
    expect(screen.queryByTestId("chatComponent")).not.toBeInTheDocument();
    expect(screen.queryByTestId("logoutComponent")).not.toBeInTheDocument();
  });
});
