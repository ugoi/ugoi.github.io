import React from "react";
import {
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
    <Box style={{ height: "100vh" }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item md={8} xs={12}>
          <Typography variant="h3" color="silver" gutterBottom>
            <Typography
              variant="h3"
              color="silver"
              gutterBottom
              sx={{
                mx: { xs: 3, md: 0 },
              }}
            >
              Let me introduce myself 🌟
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: { xs: "center", md: "left" } }}
            paragraph
          >
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
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Avatar
            src={profilePicture}
            alt="Your Name"
            style={{
              width: "240px",
              height: "auto",
              marginBottom: "1em",
              borderRadius: 100, // Make the avatar square
            }}
          />
        </Grid>
      </Grid>
      <Box mt={0}>
        <Box>
          <Typography variant="h3" color="silver">
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
      </Box>
    </Box>
  );
};

export default Home2;
