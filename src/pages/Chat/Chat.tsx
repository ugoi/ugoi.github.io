import React from "react";
import { Container, Typography } from "@mui/material";

function Chat() {
  return (
    <Container data-testid="chat-page">
      <Typography variant="h3" gutterBottom>
        Chat
      </Typography>
      <Typography variant="body1">
        The chat feature is currently under development. Please check back
        later!
      </Typography>
      {/* Once your chat feature is ready, you can integrate it here */}
    </Container>
  );
}

export default Chat;
