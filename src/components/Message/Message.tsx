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
  const isConversant = direction === "incoming";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isConversant ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isConversant ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        <Avatar
          src={avatarSrc} // <-- Added this line
          sx={{
            bgcolor: isConversant
              ? theme.palette.primary.main
              : theme.palette.secondary.main,
          }}
        >
          {avatarSrc ? null : isConversant ? author.charAt(0) : "U"}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isConversant ? 1 : 0,
            mr: isConversant ? 0 : 1,
            backgroundColor: isConversant
              ? theme.palette.primary.dark
              : theme.palette.secondary.dark,
            color: theme.palette.text.primary, // Adjusting text color based on theme
            borderRadius: isConversant
              ? "20px 20px 20px 5px"
              : "20px 20px 5px 20px",
          }}
        >
          <Typography variant="body1">{text}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Message;
