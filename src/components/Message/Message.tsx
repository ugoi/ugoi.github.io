import React from "react";
import { Box, Avatar, Paper, Typography, useTheme } from "@mui/material";

interface MessageProps {
  author: string;
  text: string;
  direction: "incoming" | "outgoing";
  avatarSrc?: string; // <-- Added this line
}

const Message: React.FC<MessageProps> = ({
  author,
  text,
  direction,
  avatarSrc,
}) => {
  // <-- Added avatarSrc here
  const theme = useTheme();
  const isBot = direction === "incoming";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isBot ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        <Avatar
          src={avatarSrc} // <-- Added this line
          sx={{
            bgcolor: isBot
              ? theme.palette.primary.main
              : theme.palette.secondary.main,
          }}
        >
          {avatarSrc ? null : isBot ? author.charAt(0) : "U"}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            backgroundColor: isBot
              ? theme.palette.primary.dark
              : theme.palette.secondary.dark,
            color: theme.palette.text.primary, // Adjusting text color based on theme
            borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
          }}
        >
          <Typography variant="body1">{text}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Message;
