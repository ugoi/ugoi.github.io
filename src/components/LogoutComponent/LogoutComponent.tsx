import React from "react";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../../firebase-config";
import { Button } from "@mui/material";

const cookies = new Cookies();

interface LogoutProps {
  setIsAuth: (value: boolean) => void;
}

const LogoutComponent: React.FC<LogoutProps> = ({ setIsAuth }) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
  };

  return <Button onClick={signUserOut}>Sign Out</Button>;
};

export default LogoutComponent;
