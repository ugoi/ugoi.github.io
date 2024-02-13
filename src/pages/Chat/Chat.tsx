import { useEffect, useState } from "react";
import { Auth } from "../../components/Auth/Auth";
import { auth } from "../../firebase-config";
import { Typography, Box } from "@mui/material";
import LogoutComponent from "../../components/LogoutComponent/LogoutComponent";
import MyCometChat from "../../components/MyCometChat/MyCometChat";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import Cookies from "universal-cookie";
import { ChatProvider, useChat } from "../../contexts/ChatContext";
import ChatComponent from "../../components/Chat/Chat";


const cookies = new Cookies();

function Chat() {
  // const [isAuth, setIsAuth] = useState(false);
  // const [isLoaded, setIsLoaded] = useState<boolean>(false); // Initially set to false
  // const { isAuth, isLoaded, setIsAuth, setIsLoaded } = useChat();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     console.log("Auth state changed");
  //     if (user) {
  //       setIsAuth(true);
  //       console.log("setIsAuth(true)");
  //     } else {
  //       CometChat.logout().then(
  //         () => {
  //           console.log("Logout completed successfully");
  //         },
  //         (error) => {
  //           console.log("Logout failed with exception:", { error });
  //         },
  //       );
  //       setIsAuth(false);
  //       cookies.remove("auth-token");

  //       console.log("setIsAuth(false)");
  //     }
  //     setIsLoaded(true); // indicate loading is done regardless of the auth state
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <ChatProvider>
      <ChatComponent />
    </ChatProvider>
  );
}

export default Chat;
