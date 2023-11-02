import React from "react";
import { Box, Paper } from "@mui/material";

interface SidebarProps {
  children: React.ReactNode;
  sx?: React.CSSProperties | any; // or a more specific type depending on your requirements
}

const Sidebar: React.FC<SidebarProps> = ({ children, sx }) => {
  return (
    <Paper
      square
      sx={{
        flex: "1 1 250px", // flex shorthand: grow, shrink, basis
        width: "100%", // default width
        maxWidth: "100%", // ensure it doesn't overflow its container
        borderColor: "divider",
        overflowY: "scroll",
        ...sx,
      }}
    >
      <Box>{children}</Box>
    </Paper>
  );
};

export default Sidebar;
