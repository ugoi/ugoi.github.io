import React from "react";
import { Box } from "@mui/material";

interface ChatContainerProps {
  children: React.ReactNode;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ children }) => (
  <Box sx={{ width: "100%", mx: "auto" }} data-testid="chat-container">
    {children}
  </Box>
);

export default ChatContainer;
