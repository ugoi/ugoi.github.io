import React from "react";
import { List } from "@mui/material";

interface ConversationListProps {
  children: React.ReactNode;
}

const ConversationList: React.FC<ConversationListProps> = ({ children }) => {
  return <List>{children}</List>;
};

export default ConversationList;
