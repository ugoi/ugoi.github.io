import React from "react";
import { Avatar, ListItemText, ListItemButton } from "@mui/material";

interface ConversationProps {
  conversationId: string;
  name: string;
  lastSenderName: string;
  info: string;
  avatarSrc: string;
  status: string;
  active?: boolean;
  onSelect?: (conversationId: string) => void;
}

const Conversation: React.FC<ConversationProps> = ({
  conversationId,
  name,
  lastSenderName,
  info,
  avatarSrc,
  status,
  active = false,
  onSelect,
}) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(conversationId);
    }
  };

  return (
    <ListItemButton selected={active} onClick={handleClick}>
      <Avatar src={avatarSrc} alt={name} sx={{ mr: 1 }} />
      <ListItemText
        primary={name}
        secondary={`${lastSenderName}: ${info}`}
        secondaryTypographyProps={{ noWrap: true }}
      />
    </ListItemButton>
  );
};

export default Conversation;
