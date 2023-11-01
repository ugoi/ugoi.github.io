import React from "react";
import Container, { ContainerProps } from "@mui/material/Container";
import { Box } from "@mui/material";

interface MainContainerProps extends ContainerProps {
  children?: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <Container
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
    </Container>
  );
};

export default MainContainer;
