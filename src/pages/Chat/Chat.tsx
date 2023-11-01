import React, { useEffect, useState } from "react";
// import { Container, Typography } from "@mui/material";
import Cookies from "universal-cookie";
import { Auth } from "../../components/Auth/Auth";
import { ChatComponent } from "../../components/ChatComponent/ChatComponent";
import { auth } from "../../firebase-config";
import { Container, Typography } from "@mui/material";
import LogoutComponent from "../../components/LogoutComponent/LogoutComponent";

const cookies = new Cookies();

function Chat() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // Initially set to false

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      setIsLoaded(true); // indicate loading is done regardless of the auth state
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container
      maxWidth="lg"
      data-testid="chat-page"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {!isLoaded && <Typography>Loading...</Typography>}
      {!isAuth && isLoaded && <Auth setIsAuth={setIsAuth} />}
      {isAuth && isLoaded && <ChatComponent />}
      {isAuth && isLoaded && <LogoutComponent setIsAuth={setIsAuth} />}
    </Container>
  );
}

export default Chat;
