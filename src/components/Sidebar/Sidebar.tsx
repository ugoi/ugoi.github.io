import React from "react";
import { Box, Paper } from "@mui/material";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <Paper
      elevation={3} // Adjust to your preference
      square
      sx={{
        width: 250,
        borderColor: "divider",
        overflowY: "scroll",
      }}
    >
      <Box>{children}</Box>
    </Paper>
  );
};

export default Sidebar;
