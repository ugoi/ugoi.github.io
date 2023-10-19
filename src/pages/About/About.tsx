import React from "react";
import { Container, Typography } from "@mui/material";

function About() {
  return (
    <Container data-testid="about-page">
      <Typography variant="h3" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1">
        Provide details on how visitors can reach you. This might include your
        email, social media profiles, phone number, etc.
      </Typography>
      {/* Add your about form or other details below */}
    </Container>
  );
}

export default About;
