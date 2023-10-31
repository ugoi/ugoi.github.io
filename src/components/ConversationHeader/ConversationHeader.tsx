import { Box, Button, Typography, Paper } from "@mui/material";
import React from "react";

interface ConversationHeaderProps {
  children: React.ReactNode;
}

interface BackProps {
  onClick?: () => void;
}

interface ContentProps {
  userName: string;
  info: string;
}

interface ActionsProps {
  children: React.ReactNode;
}

const Back: React.FC<BackProps> = (props) => (
  <Button variant="text" onClick={props.onClick}>
    Back
  </Button>
);

const Content: React.FC<ContentProps> = (props) => (
  <Box>
    <Typography variant="h6">{props.userName}</Typography>
    <Typography variant="body2" color="textSecondary">
      {props.info}
    </Typography>
  </Box>
);

const Actions: React.FC<ActionsProps> = (props) => <Box>{props.children}</Box>;

const ConversationHeader: React.FC<ConversationHeaderProps> & {
  Back: typeof Back;
  Content: typeof Content;
  Actions: typeof Actions;
} = ({ children }) => {
  return (
    <Paper
      elevation={3}
      square
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 1rem",
      }}
    >
      {children}
    </Paper>
  );
};

ConversationHeader.Back = Back;
ConversationHeader.Content = Content;
ConversationHeader.Actions = Actions;

export default ConversationHeader;
