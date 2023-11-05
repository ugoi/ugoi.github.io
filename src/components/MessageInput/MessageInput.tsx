import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

interface MessageInputProps {
  onSend: any;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Check if Enter was pressed without shift key
      e.preventDefault(); // Prevent the default action to stop from submitting the form
      if (text) {
        onSend(text);
        setText(""); // Clear the message input field
      }
    }
  };

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
        onKeyPress={handleKeyPress} // Add the key press event here
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
