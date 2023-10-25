import { render, screen, waitFor } from "@testing-library/react";
import Chat from "./Chat";

test("Chat is rendered", async () => {
  render(<Chat />);

  // Wait for the "Loading..." text to appear and then disappear
  // This assumes that once your async operation completes, the "Loading..." text will be removed
  await waitFor(() => {
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
});
