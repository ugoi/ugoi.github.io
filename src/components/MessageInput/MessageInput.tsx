import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

interface MessageInputProps {
  onSend: any;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text) {
      onSend(text);
      setText(""); // Clear the message input field
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center" }}
    >
      <TextField
        sx={{ mx: 1, flex: 1 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        label="Message"
        variant="outlined"
        required
        multiline
      />
      <Button type="submit" variant="contained">
        Send
      </Button>
    </form>
  );
};

export default MessageInput;
