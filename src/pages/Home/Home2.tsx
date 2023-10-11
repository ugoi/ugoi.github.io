import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
import profilePicture from "../../profile.jpg";
import Python from "../../components/Icons/Python";
import CPP from "../../components/Icons/CPP";
import TerminalIcon from "@mui/icons-material/Terminal";
import TS from "../../components/Icons/TS";
import PostgresSQL from "../../components/Icons/PostgresSQL";
import Node from "../../components/Icons/Node";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Home2: React.FC = () => {
  return (
    <Container
      maxWidth="lg"
      style={{ padding: "2rem 0", height: "100vh" }}
      id="about"
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item md={8}>
          <Typography variant="h3" color="silver" gutterBottom>
            Let me introduce myself 🌟
          </Typography>
          <Typography variant="body1" textAlign="left" paragraph>
            Studied at <strong>42 School</strong> 🎓, embracing a peer-to-peer
            learning approach. Specialized in Full-Stack and C++ Development 💻.
            Currently a Mulesoft Integration Architect and API Developer at{" "}
            <strong>Audi</strong> 🚗.
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            justifyContent="center"
          >
            <Typography variant="body1">My skills are:</Typography>
            <a
              href="https://www.cplusplus.com/"
              target="_blank"
              rel="noreferrer"
            >
              <CPP />
            </a>
            <a href="https://www.python.org/" target="_blank" rel="noreferrer">
              <Python />
            </a>
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noreferrer"
            >
              <TS />
            </a>
            <a
              href="https://www.postgresql.org/"
              target="_blank"
              rel="noreferrer"
            >
              <PostgresSQL />
            </a>
            <a href="https://nodejs.org/" target="_blank" rel="noreferrer">
              <Node fontSize="large" />
            </a>
            <a
              href="https://www.gnu.org/software/bash/"
              target="_blank"
              rel="noreferrer"
            >
              <TerminalIcon />
            </a>
          </Stack>

          <Box mt={4}>
            <Typography variant="h4" color="silver">
              Connect
            </Typography>
          </Box>

          <Box alignItems="center" gap={2} mt={0}>
            <IconButton
              href="https://github.com/ugoi"
              target="_blank"
              rel="noreferrer"
              color="primary"
            >
              <LinkedInIcon fontSize="large" />
            </IconButton>

            <IconButton
              href="https://github.com/ugoi"
              target="_blank"
              rel="noreferrer"
              color="primary"
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Avatar
            src={profilePicture}
            alt="Your Name"
            style={{
              width: "100%",
              height: "auto",
              marginBottom: "1em",
              borderRadius: 100, // Make the avatar square
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home2;
