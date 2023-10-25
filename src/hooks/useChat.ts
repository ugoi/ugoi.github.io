// hooks/useChat.ts
import { useState, useEffect, useMemo } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

export const useChat = () => {
  const [currentMessages, setCurrentMessages] = useState<any[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null,
  );
  const messagesRef = useMemo(() => collection(db, "messages"), []);
  const [adminUser, setAdminUser] = useState<any | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    if (!auth.currentUser) {
      console.log("auth.currentUser is undefined");
      return;
    }

    if (!adminUser) {
      return;
    }

    console.log("Query Messages useEffect");
    let queryMessages;

    // Check if the authenticated user is the admin
    if (auth.currentUser.uid === adminUser.uid) {
      queryMessages = query(messagesRef, orderBy("createdAt"));
    } else {
      queryMessages = query(
        messagesRef,
        where("room", "==", `${adminUser?.uid}_${auth.currentUser.uid}`),
        orderBy("createdAt"),
      );
    }

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let fetchedMessages: any[] = [];
      let roomsMap: { [key: string]: any } = {}; // To store unique rooms

      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedMessages.push({ ...data, id: doc.id });

        // If the user is an admin, process the messages to generate conversations
        if (auth.currentUser?.uid === adminUser.uid) {
          if (!roomsMap[data.room]) {
            roomsMap[data.room] = {
              conversationId: data.room,
              name: data.userName, // This assumes the user's name is the conversation name
              lastSenderName: data.userName,
              info: data.text, // Last message text as the conversation info
              avatarSrc: data.photoURL,
              status: "online", // Placeholder, adjust as needed
            };
          }
        }
      });

      // If the current user is NOT an admin and no conversation with the admin exists

      if (auth.currentUser?.uid !== adminUser.uid) {
        const defaultRoomId = `${adminUser.uid}_${auth.currentUser?.uid}`;
        roomsMap[defaultRoomId] = {
          conversationId: defaultRoomId,
          name: adminUser.displayName, // Assuming displayName is the admin's name
          lastSenderName: adminUser.displayName,
          info: "Start a conversation", // Default text when no messages are present
          avatarSrc: adminUser.photoURL, // Assuming photoURL is the admin's avatar
          status: "online",
        };
      }

      const conversationValues = Object.values(roomsMap);

      setCurrentMessages(fetchedMessages);
      setConversations(Object.values(roomsMap));
      // If there's no active conversation yet, set the first one
      if (
        conversationValues.length > 0 &&
        auth.currentUser?.uid !== adminUser.uid
      ) {
        setActiveConversation(conversationValues[0].conversationId);
      }
    });

    return () => unsubscribe();
  }, [messagesRef, adminUser]);

  const fetchAdminUser = async () => {
    try {
      const usersRef = collection(db, "users");
      const adminQuery = query(usersRef, where("role.isAdmin", "==", true));

      const querySnapshot = await getDocs(adminQuery);
      const adminUsers: any[] = [];
      querySnapshot.forEach((doc) => {
        adminUsers.push(doc.data());
      });

      if (adminUsers.length > 0) {
        setAdminUser(adminUsers[0]);
      }
    } catch (err) {
      console.error("Error fetching admin user: ", err);
    }
  };

  useEffect(() => {
    fetchAdminUser();
  }, []);

  const sendMessage = async (roomId: string, text: string) => {
    if (!roomId || !text.trim()) return;

    if (!auth.currentUser) {
      console.error("Current user data not available.");
      return;
    }

    await addDoc(messagesRef, {
      text: text,
      createdAt: serverTimestamp(),
      userName: auth.currentUser.displayName,
      userUid: auth.currentUser.uid,
      room: roomId,
      photoURL: auth.currentUser.photoURL,
    });
  };

  const getUser = () => auth.currentUser;

  return {
    currentMessages,
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    getUser,
  };
};
