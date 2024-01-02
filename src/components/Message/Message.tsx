import React from "react";
import { Box, Avatar, Paper, Typography, useTheme } from "@mui/material";

interface MessageProps {
  author: string;
  text: string;
  direction: "incoming" | "outgoing";
  avatarSrc?: string; // <-- Added this line
}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ author, text, direction, avatarSrc, ...props }, ref) => {
    const theme = useTheme();
    const isConversant = direction === "incoming";

    return (
      <Box
        ref={ref} // Attach the ref to the root Box component
        {...props}
        sx={{
          display: "flex",
          justifyContent: isConversant ? "flex-start" : "flex-end",
          mr: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isConversant ? "row" : "row-reverse",
            alignItems: "flex-end",
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
                ? theme.palette.mode === "dark"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light
                : theme.palette.mode === "dark"
                ? theme.palette.secondary.dark
                : theme.palette.secondary.light,

              color: theme.palette.text.primary, // Adjusting text color based on theme
              borderRadius: isConversant
                ? "20px 20px 20px 5px"
                : "20px 20px 5px 20px",
              maxWidth: "80%", // Set a max width for the message bubble
              wordBreak: "break-word", // Ensures that long words do not overflow
            }}
          >
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {text}
            </Typography>
          </Paper>
        </Box>
      </Box>
    );
  },
);

export default Message;
