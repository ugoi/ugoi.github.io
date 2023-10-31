import React from "react";
import { Box } from "@mui/material";

interface ChatContainerProps {
  children: React.ReactNode;
  sx?: React.CSSProperties | any; // or a more specific type depending on your requirements
}

const ChatContainer: React.FC<ChatContainerProps> = ({ children, sx }) => (
  <Box
    sx={{
      width: "100%",
      mx: "auto",
      ...sx, // spread the passed sx prop to override the default styles
    }}
    data-testid="chat-container"
  >
    {children}
  </Box>
);

export default ChatContainer;
