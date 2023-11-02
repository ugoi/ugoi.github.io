import React from "react";
import { ContainerProps } from "@mui/material/Container";
import { Box } from "@mui/material";

interface MainContainerProps extends ContainerProps {
  children?: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <Box
      {...props}
      sx={{ height: "100%" }}
      maxWidth="xl"
      data-testid="main-container"
    >
      <Box
        display="flex"
        sx={{ height: "100%" }}
        justifyContent="space-between"
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainContainer;
