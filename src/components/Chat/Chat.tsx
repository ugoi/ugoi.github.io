import { Auth } from "../../components/Auth/Auth";
import { Typography, Box } from "@mui/material";
import LogoutComponent from "../../components/LogoutComponent/LogoutComponent";
import MyCometChat from "../../components/MyCometChat/MyCometChat";
import Cookies from "universal-cookie";
import { useChat } from "../../contexts/ChatContext";

const cookies = new Cookies();

function Chat() {
  const { isAuth, isLoaded, setIsAuth, setIsLoaded } = useChat();

  return (
    <Box
      data-testid="chat-page"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {!isLoaded && <Typography>Loading...</Typography>}
      {!isAuth && isLoaded && <Auth setIsAuth={setIsAuth} />}
      {isAuth && isLoaded && <MyCometChat />}
      {isAuth && isLoaded && <LogoutComponent setIsAuth={setIsAuth} />}
    </Box>
  );
}

export default Chat;
