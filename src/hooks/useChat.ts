import { useState, useEffect, useRef, useCallback } from "react";
import { auth } from "../firebase-config";
// import firebaseService from "../services/FirebaseService";
import FirebaseService from "../services/FirebaseService";
import { Conversation, Message } from "../services/Types";

export const useChat = () => {
  // State declarations
  // Use a Map for currentMessages to ensure unique message IDs
  const [storeCurrentMessages, setStoreCurrentMessages] = useState<
    Map<string, Message>
  >(new Map());

  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  const [activeConversation, setActiveConversation] = useState<any | null>(
    null,
  );
  const [adminUser, setAdminUser] = useState<any | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [firebaseService, setFirebaseService] =
    useState<FirebaseService | null>(null);

  // Define a new function
  const createDefaultRoom = async () => {
    console.log("createDefaultRoom");

    if (!firebaseService) {
      return;
    }

    const currentUser = firebaseService.getCurrentUser();

    if (currentUser?.uid == adminUser?.uid) {
      return;
    }

    if (!currentUser || !adminUser) {
      console.error("Current user or admin user data not available.");
      return;
    }

    // Generate a unique roomId from the userIds array
    const userIds = [adminUser.uid, currentUser.uid];
    // const roomId = userIds.join("_");

    // Check if the room already exists

    // const roomExists = await this.checkRoomExistence(roomId);

    // if (!roomExists) {
    //   // If the room doesn't exist, create it

    await firebaseService.createRoom(userIds);
    // }
  };

  useEffect(() => {
    (async () => {
      const service = new FirebaseService();
      await service.initialize();
      setFirebaseService(service);
    })();
  }, []);

  useEffect(() => {
    if (!firebaseService || !adminUser) {
      return;
    }
    createDefaultRoom();
  }, [firebaseService, adminUser]);

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

      setStoreCurrentMessages((prevMessages) => {
        const updatedMessages = new Map(prevMessages);
        messages.forEach((message) => {
          updatedMessages.set(message.id, message);
        });

        // Convert the Map to an array and sort by createdAt timestamp
        const sortedMessages = Array.from(updatedMessages.values()).sort(
          (a, b) => {
            // Check if either createdAt is null and handle accordingly
            if (a.createdAt === null) return 1; // a is newer
            if (b.createdAt === null) return -1; // b is newer

            // If both timestamps are not null, sort by converting to millis
            return a.createdAt.toMillis() - b.createdAt.toMillis();
          },
        );

        // Set currentMessages here using the sorted messages
        setCurrentMessages(sortedMessages);
        return updatedMessages;
      });
    };

    const unsubscribe = firebaseService.onMessages(handleNewMessages);

    return () => unsubscribe();
  }, [adminUser, firebaseService]);

  useEffect(() => {
    if (!firebaseService || !auth.currentUser) {
      return;
    }

    // Define the callback function to handle new rooms
    const handleNewRooms = (newConversations: Conversation[]) => {
      setConversations(newConversations);
    };

    // Subscribe to room updates
    const unsubscribe = firebaseService.onRooms(handleNewRooms);

    // Cleanup function to unsubscribe when the component unmounts or dependencies change
    return () => unsubscribe();
  }, [firebaseService]);

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

  // Ref for the IntersectionObserver
  const observer = useRef<IntersectionObserver | null>(null);

  const lastMessageRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting && node && activeConversation) {
            // Retrieve the ID from the data attribute of the node
            const messageId = node.getAttribute("data-message-id");
            // Find the message in currentMessages using the ID
            const message = currentMessages.find((m) => m.id === messageId);
            console.log("message");
            console.log(message);
            if (message && firebaseService) {
              // Fetch more messages using the createdAt timestamp of the last message
              const newMessages = await firebaseService.fetchPaginatedMessages(
                activeConversation.conversationId,
                message.createdAt,
              );

              console.log("currentMessages");
              console.log(currentMessages);

              // Reverse the new messages before prepending
              const reversedNewMessages = newMessages.reverse();

              console.log("reversedNewMessages");
              console.log(reversedNewMessages);

              // Prepend the new messages to the current messages
              setCurrentMessages((prevMessages) => [
                ...reversedNewMessages,
                ...prevMessages,
              ]);
            }
          }
        },
        {
          // Observer configuration
          root: null,
          rootMargin: "0px",
          threshold: 1.0,
        },
      );

      if (node) observer.current.observe(node);
    },
    [currentMessages, activeConversation, firebaseService],
  ); // Add dependencies

  // Return values
  return {
    currentMessages,
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    getUser,
    lastMessageRef,
  };
};
