import { Box, Typography, Paper, IconButton } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  <IconButton aria-label="delete" onClick={props.onClick}>
    <ArrowBackIcon />
  </IconButton>
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

type ChildrenProps = {
  children: React.ReactNode;
};

const ConversationHeader: React.FC<ChildrenProps> & {
  Back: typeof Back;
  Content: typeof Content;
  Actions: typeof Actions;
} = ({ children }) => {
  return (
    <Paper
      square
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return (
              <Box sx={{ marginRight: child.type === Back ? "0" : "1rem" }}>
                {child}
              </Box>
            );
          }
          return child;
        })}
      </Box>
    </Paper>
  );
};

ConversationHeader.Back = Back;
ConversationHeader.Content = Content;
ConversationHeader.Actions = Actions;

export default ConversationHeader;
