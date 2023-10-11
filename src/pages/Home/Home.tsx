import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import homeLogo from "../../web-developer.svg";
import Home2 from "./Home2";
import Type from "./Type";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const Home: React.FC = () => {
  const theme = useTheme();

  const StyledTypeWriter = styled("div")({
    ...theme.typography.h4, // Spread the h1 styles onto this component
    color: "silver",
    textAlign: "left",
  });

  return (
    <Box>
      <Box
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "top",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item md={7}>
              <Typography variant="h3" textAlign="left" gutterBottom>
                Hi There!{" "}
                <span role="img" aria-label="wave">
                  👋🏻
                </span>
              </Typography>
              <Typography variant="h4" textAlign="left">
                I'm <span style={{ fontWeight: "bold" }}>Stefan Dukic</span>
              </Typography>
              <Box mt={3}>
                <StyledTypeWriter>
                  <Type />
                </StyledTypeWriter>
              </Box>
            </Grid>
            <Grid item md={5}>
              <img src={homeLogo} alt="home" style={{ maxHeight: "80vh" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Home2 />
    </Box>
  );
};

export default Home;
