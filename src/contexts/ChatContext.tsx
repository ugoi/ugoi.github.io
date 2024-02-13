// src/contexts/ChatContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { auth } from "../firebase-config"; // Adjust the import path as necessary
import Cookies from "universal-cookie";
import { CometChat } from "@cometchat/chat-sdk-javascript";

interface ChatContextType {
  authToken: string | null;
  isAuth: boolean;
  isLoaded: boolean;
  setAuthToken: (token: string | null) => void;
  setIsAuth: (isAuthenticated: boolean) => void;
  setIsLoaded: (isLoaded: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const cookies = new Cookies();

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // Initially set to false

  useEffect(() => {
    const token = cookies.get("auth-token");
    setAuthToken(token);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
        // Optionally update authToken here if needed
      } else {
        CometChat.logout().then(
          () => {
            console.log("Logout completed successfully");
          },
          (error) => {
            console.log("Logout failed with exception:", { error });
          },
        );
        setIsAuth(false);
        setAuthToken(null); // Clear authToken if necessary
        cookies.remove("auth-token");
      }
      setIsLoaded(true); // indicate loading is done regardless of the auth state
    });

    return () => unsubscribe();
  }, []);

  const value = {
    authToken,
    isAuth,
    isLoaded,
    setAuthToken,
    setIsAuth,
    setIsLoaded,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
