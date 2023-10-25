import React, { useEffect, useRef } from "react";
import { List, Box } from "@mui/material";

interface MessageListProps {
  children: React.ReactNode;
}

const MessageList: React.FC<MessageListProps> = ({ children }) => {
  const chatEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [children]);

  return (
    <Box sx={{ height: "70vh", overflowY: "scroll" }}>
      {" "}
      {/* <-- Set height and overflowY here */}
      <List>
        {children}
        <div ref={chatEndRef} /> {/* <-- This is our anchor */}
      </List>
    </Box>
  );
};

export default MessageList;
