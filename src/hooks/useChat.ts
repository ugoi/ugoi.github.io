import { useState, useEffect } from "react";
import { auth } from "../firebase-config";
// import firebaseService from "../services/FirebaseService";
import FirebaseService from "../services/FirebaseService";
import { Message } from "../services/Types";

export const useChat = () => {
  // State declarations
  const [currentMessages, setCurrentMessages] = useState<any[]>([]);
  const [activeConversation, setActiveConversation] = useState<any | null>(
    null,
  );
  const [adminUser, setAdminUser] = useState<any | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [firebaseService, setFirebaseService] =
    useState<FirebaseService | null>(null);

  useEffect(() => {
    (async () => {
      const service = new FirebaseService();
      await service.initialize();
      setFirebaseService(service);
    })();
  }, []);

  // Effects
  useEffect(() => {
    if (!firebaseService) {
      return;
    }
    const initializeAdminUser = async () => {
      const admin = firebaseService.getAdminUser();
      setAdminUser(admin);
    };

    initializeAdminUser();
  }, [firebaseService]);

  useEffect(() => {
    if (!auth.currentUser || !adminUser || !firebaseService) {
      return;
    }
    const handleNewMessages = (messages: Message[]) => {
      if (!auth.currentUser) {
        console.log("auth.currentUser is undefined");
        return;
      }

      setCurrentMessages(messages);

      // Generate conversations from messages
      const generatedConversations =
        firebaseService.generateConversationsFromMessages(messages);
      if (generatedConversations) {
        setConversations(generatedConversations);
      }
    };

    const unsubscribe = firebaseService.onMessages(handleNewMessages);

    return () => unsubscribe();
  }, [adminUser, firebaseService]);

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
    if (!firebaseService) {
      return;
    }
    const unloadCallback = () => {
      firebaseService.deleteApp();
    };

    window.addEventListener("beforeunload", unloadCallback);

    return () => {
      window.removeEventListener("beforeunload", unloadCallback);
    };
  }, [firebaseService]);

  // Methods
  const sendMessage = async (roomId: string, text: string) => {
    if (!firebaseService || !text) {
      return;
    }
    await firebaseService.sendMessage(roomId, text);
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
