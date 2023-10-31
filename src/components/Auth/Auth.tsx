import React from "react";
import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import "../../styles/Auth.css";
import Cookies from "universal-cookie";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config"; // Assuming you've exported 'db' from firebase-config

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
    <div className="auth">
      <p> Sign In With Google To Continue </p>
      <button onClick={signInWithGoogle}> Sign In With Google </button>
    </div>
  );
};
