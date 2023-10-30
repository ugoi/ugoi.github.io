import { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import firebaseService from "../services/FirebaseService";
import {
  fetchAdminUser,
  generateConversationsFromMessages,
} from "./chatHelpers";

export const useChat = () => {
  // State declarations
  const [currentMessages, setCurrentMessages] = useState<any[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null,
  );
  const [adminUser, setAdminUser] = useState<any | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);

  // Effects
  useEffect(() => {
    const initializeAdminUser = async () => {
      const user = await fetchAdminUser();
      setAdminUser(user);
    };

    initializeAdminUser();
  }, []);

  useEffect(() => {
    console.log("useEffect handleNewMessages");
    if (!auth.currentUser || !adminUser) {
      return;
    }
    const handleNewMessages = (messages: any[]) => {
      if (!auth.currentUser) {
        console.log("auth.currentUser is undefined");
        return;
      }

      console.log("handleNewMessages");
      setCurrentMessages(messages);

      // Generate conversations from messages
      const generatedConversations = generateConversationsFromMessages(
        messages,
        auth.currentUser.uid,
        adminUser,
      );

      setConversations(generatedConversations);

      if (
        generatedConversations.length > 0 &&
        auth.currentUser?.uid !== adminUser.uid
      ) {
        setActiveConversation(generatedConversations[0].conversationId);
      }
    };

    const unsubscribe = firebaseService.onMessages(
      auth.currentUser.uid,
      handleNewMessages,
    );

    return () => unsubscribe();
  }, [adminUser]);

  // useEffect(() => {
  //   if (!auth.currentUser || !adminUser) {
  //     return;
  //   }
  //   const handleNewConversations = (conversations: any[]) => {
  //     if (!auth.currentUser) {
  //       console.log("auth.currentUser is undefined");
  //       return;
  //     }

  //     console.log("handleNewConversations");
  //     setConversations(conversations);

  //     if (conversations.length > 0 && auth.currentUser?.uid !== adminUser.uid) {
  //       setActiveConversation(conversations[0].conversationId);
  //     }
  //   };

  //   const unsubscribe = firebaseService.onConversations(
  //     auth.currentUser.uid,
  //     handleNewConversations,
  //   );

  //   return () => unsubscribe();
  // }, [adminUser]);

  // Clean up Firebase app instance before page unload
  useEffect(() => {
    const unloadCallback = () => {
      firebaseService.deleteApp();
    };

    window.addEventListener("beforeunload", unloadCallback);

    return () => {
      window.removeEventListener("beforeunload", unloadCallback);
    };
  }, []);

  // Methods
  const sendMessage = async (roomId: string, text: string) => {
    const user = auth.currentUser;
    if (user) {
      await firebaseService.sendMessage(roomId, text, user);
    }
  };

  const getUser = () => auth.currentUser;

  // Return values
  return {
    currentMessages,
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    getUser,
  };
};
