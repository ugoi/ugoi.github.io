import React from "react";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../../firebase-config";
import { Button } from "@mui/material";
import { CometChat } from "@cometchat/chat-sdk-javascript";

const cookies = new Cookies();

interface LogoutProps {
  setIsAuth: (value: boolean) => void;
}

const LogoutComponent: React.FC<LogoutProps> = ({ setIsAuth }) => {
  const signUserOut = async () => {
    await signOut(auth);
    // cookies.remove("auth-token");
    // CometChat.logout().then(
    //   () => {
    //     console.log("Logout completed successfully");
    //   },error=>{
    //     console.log("Logout failed with exception:",{error});
    //   }
    // );
    // setIsAuth(false);
  };

  return <Button onClick={signUserOut}>Sign Out</Button>;
};

export default LogoutComponent;
