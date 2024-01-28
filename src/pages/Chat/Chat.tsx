import { useEffect, useState } from "react";
import { Auth } from "../../components/Auth/Auth";
import { ChatComponent } from "../../components/ChatComponent/ChatComponent";
import { auth } from "../../firebase-config";
import { Typography, Box } from "@mui/material";
import LogoutComponent from "../../components/LogoutComponent/LogoutComponent";

function Chat() {
  const [isAuth, setIsAuth] = useState(false);
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
    <Box
      data-testid="chat-page"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {!isLoaded && <Typography>Loading...</Typography>}
      {!isAuth && isLoaded && <Auth setIsAuth={setIsAuth} />}
      {isAuth && isLoaded && <ChatComponent />}
      {isAuth && isLoaded && <LogoutComponent setIsAuth={setIsAuth} />}
    </Box>
  );
}

export default Chat;
