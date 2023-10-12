import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import projects from "./projectsData";

const Portfolio: React.FC = () => {
  return (
    <Grid container spacing={3} mt={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          My Best Projects
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          A showcase of my most notable work.
        </Typography>
      </Grid>
      {projects.map((project, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={project.imageUrl}
              alt={project.title}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {project.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.description}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="GitHub"
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
              </IconButton>
              <Button
                size="small"
                color="primary"
                href={project.deployedLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Deployed
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Portfolio;
