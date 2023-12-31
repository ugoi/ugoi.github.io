import { Container, Stack, Typography } from "@mui/material";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import CPP from "../../components/Icons/CPP";
import Python from "../../components/Icons/Python";
import TS from "../../components/Icons/TS";
import PostgresSQL from "../../components/Icons/PostgresSQL";
import Node from "../../components/Icons/Node";
import TerminalIcon from "@mui/icons-material/Terminal";

const url = (name: string, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

const pages = 10;

const About = () => {
  return (
    <div
      style={{ width: "100%", height: "100%", textAlign: "left" }}
      data-testid="about-page"
    >
      <Parallax pages={pages}>
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={pages}
          style={{
            backgroundImage: url("stars", true),
            backgroundSize: "cover",
          }}
        />
        <ParallaxLayer sticky={{ start: 0, end: 0.5 }}>
          <Container>
            <Typography
              sx={{
                typography: { xs: "h3", md: "h2" },
              }}
              mb={3}
            >
              Design & Prototyping
            </Typography>
            <Typography
              sx={{
                typography: { xs: "h6", md: "h5" },
              }}
            >
              In today’s digital landscape, first impressions are critical.
              Exceptional design is key to engaging and keeping your audience. I
              offer comprehensive design services, focusing on striking,
              user-friendly designs to make your project stand out. I
              collaborate closely with you from early sketches to polished
              prototypes, streamlining the user experience before coding begins.
              Let's craft designs that captivate your audience and pave the way
              for your project's triumph.
            </Typography>
          </Container>
        </ParallaxLayer>

        <ParallaxLayer offset={1} sticky={{ start: 1.5, end: 2 }}>
          <Container>
            <Typography
              sx={{
                typography: { xs: "h3", md: "h2" },
              }}
              gutterBottom
            >
              Frontend Development
            </Typography>
            <Typography
              sx={{
                typography: { xs: "h6", md: "h5" },
              }}
              paragraph
            >
              Are you in need of an expert to bring your user interfaces to
              life? Look no further. I specialize in crafting intuitive and
              dynamic frontend experiences that captivate and engage. Whether
              it's a simple website or a complex web application, I ensure your
              project will not only look good but will also be user-friendly,
              accessible, and responsive across all devices. Let's work together
              to make your vision a tangible reality.
            </Typography>
          </Container>
        </ParallaxLayer>

        <ParallaxLayer offset={2} sticky={{ start: 3, end: 3.5 }}>
          <Container>
            <Typography
              sx={{
                typography: { xs: "h3", md: "h2" },
              }}
              mb={3}
            >
              Backend Development
            </Typography>
            <Typography
              sx={{
                typography: { xs: "h6", md: "h5" },
              }}
            >
              Are you in need of an expert to bring your user interfaces to
              life? Look no further. I specialize in crafting intuitive and
              dynamic frontend experiences that captivate and engage. Whether
              it's a simple website or a complex web application, I ensure your
              project will not only look good but will also be user-friendly,
              accessible, and responsive across all devices. Let's work together
              to make your vision a tangible reality.
            </Typography>
          </Container>
        </ParallaxLayer>

        <ParallaxLayer offset={3} sticky={{ start: 4.5, end: 5 }}>
          <Container>
            <Typography
              sx={{
                typography: { xs: "h3", md: "h2" },
              }}
              component="h2"
              gutterBottom
            >
              API Development
            </Typography>
            <Typography
              sx={{
                typography: { xs: "h6", md: "h5" },
              }}
              paragraph
            >
              In today’s interconnected digital ecosystem, your applications
              need to communicate seamlessly with other systems and services. I
              am adept at creating and integrating APIs that allow for such
              interactions, ensuring that your software components work together
              harmoniously. Whether you're looking to integrate with third-party
              services or build custom APIs for your own applications, I can
              provide the secure, reliable, and well-documented API solutions
              you need.
            </Typography>
          </Container>
        </ParallaxLayer>

        <ParallaxLayer offset={4} sticky={{ start: 6, end: 6.5 }}>
          <Container>
            <Typography
              sx={{
                typography: { xs: "h3", md: "h2" },
              }}
              component="h2"
              gutterBottom
            >
              Database Management
            </Typography>
            <Typography
              sx={{
                typography: { xs: "h6", md: "h5" },
              }}
              paragraph
            >
              Data is at the heart of every application. I offer my expertise in
              database design and management, ensuring that your data is not
              just stored but is also meaningful and easily retrievable. With a
              solid understanding of both SQL and NoSQL database technologies, I
              can help you choose and manage the right database solutions that
              align with your needs, providing a solid foundation for your
              data-driven applications.
            </Typography>
          </Container>
        </ParallaxLayer>
        <ParallaxLayer offset={5} sticky={{ start: 7.5, end: 8 }}>
          <Container>
            <Typography
              sx={{
                typography: { xs: "h3", md: "h2" },
              }}
              component="h2"
              gutterBottom
            >
              Continuous Integration
            </Typography>
            <Typography
              sx={{
                typography: { xs: "h6", md: "h5" },
              }}
              paragraph
            >
              The world of technology moves quickly, and your development
              practices should keep pace. I can assist you in implementing
              continuous integration systems, facilitating automated testing,
              and ensuring that your software can be reliably released at any
              time. With my help, you can streamline your development process,
              reduce integration issues, and increase the quality of your
              software builds.
            </Typography>
          </Container>
        </ParallaxLayer>
        <ParallaxLayer
          offset={6}
          sticky={{ start: 9, end: 9.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container>
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
          </Container>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default About;
