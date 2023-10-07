import React from "react";
import { Container, Typography } from "@mui/material";

function Contact() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Contact Me
      </Typography>
      <Typography variant="body1">
        Provide details on how visitors can reach you. This might include your
        email, social media profiles, phone number, etc.
      </Typography>
      {/* Add your contact form or other details below */}
    </Container>
  );
}

export default Contact;
