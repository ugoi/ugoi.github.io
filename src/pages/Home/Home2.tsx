import React from "react";
import {
  Grid,
  Typography,
  Box,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
import profilePicture from "../../Assets/profile.jpg";
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
    <Box>
      <Grid container spacing={3} alignItems="center">
        <Grid item md={8} xs={12}>
          <Typography
            gutterBottom
            sx={{
              mx: { xs: 3, md: 0 },
              typography: { xs: "h4", md: "h3" },
            }}
          >
            Let me introduce myself
          </Typography>

          <Typography
            variant="h6"
            sx={{ textAlign: { xs: "center", md: "left" } }}
            paragraph
          >
            A Data Engineer from <strong>42 Heilbronn</strong>, I've delved deep
            into C, C++, and TypeScript. My recent endeavors involve real-time
            data processing in web apps and exploring the realm of Web3.
          </Typography>

          <Typography
            variant="h6"
            sx={{ textAlign: { xs: "center", md: "left" } }}
            paragraph
          >
            My toolkit includes SQL, Python, Docker, and more. Passionate and
            ever-curious, I'm shaping the tech future with innovative projects
            and collaborations.
          </Typography>

          <Typography
            variant="h6"
            sx={{ textAlign: { xs: "center", md: "left" } }}
            paragraph
          >
            Beyond the tech stack, I believe in the power of continuous learning
            and collaboration. Currently contributing to a startup in the Web3
            sector, I'm excited about the transformative potential of
            decentralized technologies and eager to drive change in the tech
            landscape.
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            justifyContent="center"
          >
            <Typography variant="h6">Key Skills:</Typography>
            <a
              href="https://www.cplusplus.com/"
              target="_blank"
              rel="noreferrer"
              data-testid="cpp-link"
            >
              <CPP />
            </a>
            <a
              href="https://www.python.org/"
              target="_blank"
              rel="noreferrer"
              data-testid="python-link"
            >
              <Python />
            </a>
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noreferrer"
              data-testid="typescript-link"
            >
              <TS />
            </a>
            <a
              href="https://www.postgresql.org/"
              target="_blank"
              rel="noreferrer"
              data-testid="postgresql-link"
            >
              <PostgresSQL />
            </a>
            <a
              href="https://nodejs.org/"
              target="_blank"
              rel="noreferrer"
              data-testid="node-link"
            >
              <Node fontSize="large" />
            </a>
            <a
              href="https://www.gnu.org/software/bash/"
              target="_blank"
              rel="noreferrer"
              data-testid="bash-link"
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
      <Box my={12}>
        <Box>
          <Typography
            sx={{ typography: { xs: "h4", md: "h3" } }}
            color="silver"
          >
            Connect
          </Typography>
        </Box>

        <Box alignItems="center" gap={2} mt={0}>
          <IconButton
            href="https://www.linkedin.com/in/stefan-dukic-68682b20b/"
            target="_blank"
            rel="noreferrer"
            color="primary"
            data-testid="linkedin-button"
          >
            <LinkedInIcon fontSize="large" />
          </IconButton>

          <IconButton
            href="https://github.com/ugoi"
            target="_blank"
            rel="noreferrer"
            color="primary"
            data-testid="github-button"
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Home2;
