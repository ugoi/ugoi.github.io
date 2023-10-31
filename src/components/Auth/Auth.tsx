import React from "react";
import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config"; // Assuming you've exported 'db' from firebase-config
import { Box } from "@mui/material";
import GoogleButton from "react-google-button";

const cookies = new Cookies();

interface AuthProps {
  setIsAuth: (value: boolean) => void;
}

export const Auth: React.FC<AuthProps> = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Get the user's document reference
      const userDocRef = doc(db, "users", result.user.uid);

      // Fetch the document
      const userDoc = await getDoc(userDocRef);

      // If the user doesn't exist in Firestore, add them
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: result.user.uid,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          role: {
            isAdmin: false,
            isMember: true,
          },
          // Add any other necessary fields you need
        });
      }

      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box className="auth">
      <Box display="flex" justifyContent="center" mt={9}>
        <GoogleButton
          type="dark" // can be light or dark
          onClick={signInWithGoogle}
        />
      </Box>
    </Box>
  );
};
