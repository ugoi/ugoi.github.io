import { Container, Grid, Typography, Avatar } from "@mui/material";
import profilePicture from "../../profile.jpg";

function Home() {
  return (
    <Container>
      <Grid container spacing={3} style={{ marginTop: "2em" }}>
        <Grid item xs={12} md={4}>
          <Avatar
            src={profilePicture}
            alt="Your Name"
            style={{
              width: "100%",
              height: "auto",
              marginBottom: "1em",
              borderRadius: 9, // Make the avatar square
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Developer Stefan
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to my website! I'm Stefan, a passionate developer with a
            knack for creating innovative solutions. Dive into my portfolio to
            explore my past projects or get in touch with me directly through
            the contact page. Excited to connect with you!
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
