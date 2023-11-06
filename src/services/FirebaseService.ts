import { app, auth, db } from "../firebase-config";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import IChatService from "../interfaces/IChatService";
import { deleteApp } from "firebase/app";
import { AdminUser, Conversation, Message } from "./Types";

class FirebaseService implements IChatService {
  private messagesRef = collection(db, "messages");
  private adminUser: AdminUser | null = null;
  private currentUser = auth.currentUser;

  async initialize(): Promise<void> {
    this.adminUser = await FirebaseService.fetchAdminUser();
  }

  getAdminUser(): AdminUser | null {
    console.log("adminUser");
    console.log(this.adminUser);
    return this.adminUser;
  }

  async sendMessage(roomId: string, text: string): Promise<void> {
    if (!roomId || !text.trim()) {
      console.error("Invalid room ID or message text.");
      return;
    }

    const currentUser = this.currentUser;

    if (!currentUser) {
      console.error("User data not available.");
      return;
    }

    try {
      await addDoc(this.messagesRef, {
        text: text,
        createdAt: serverTimestamp(),
        userName: currentUser.displayName,
        userUid: currentUser.uid,
        room: roomId,
        photoURL: currentUser.photoURL,
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  }

  onMessages(onNewMessages: (messages: Message[]) => void): () => void {
    const currentUserUid = this.currentUser?.uid;

    if (!currentUserUid) {
      console.error("User ID not provided.");
      return () => {};
    }

    let unsubscribe: () => void = () => {};

    (async () => {
      const adminUser = this.adminUser;
      if (!adminUser) {
        console.error("Admin user not found.");
        return;
      }

      let queryMessages;

      // Check if the authenticated user is the admin
      if (currentUserUid === adminUser.uid) {
        queryMessages = query(this.messagesRef, orderBy("createdAt"));
      } else {
        queryMessages = query(
          this.messagesRef,
          where("room", "==", `${adminUser.uid}_${currentUserUid}`),
          orderBy("createdAt"),
        );
      }

      unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        const fetchedMessages: Message[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetchedMessages.push({ ...(data as Message), id: doc.id });
        });
        onNewMessages(fetchedMessages);
      });
    })();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }

  generateConversationsFromMessages = (messages: Message[]): Conversation[] => {
    let roomsMap: { [key: string]: Conversation } = {}; // To store unique rooms

    const currentUserUid = this.currentUser?.uid;
    const adminUser = this.adminUser;

    if (!currentUserUid) {
      console.error("User data not available.");
      return [];
    }
    if (!adminUser) {
      console.error("Admin user data not available.");
      return [];
    }

    messages.forEach((message) => {
      if (currentUserUid === adminUser.uid) {
        if (!roomsMap[message.room]) {
          roomsMap[message.room] = {
            conversationId: message.room,
            name: message.userName,
            lastSenderName: message.userName,
            info: message.text,
            avatarSrc: message.photoURL,
            status: "online",
          };
        }
      }
    });

    if (currentUserUid !== adminUser.uid) {
      const defaultRoomId = `${adminUser.uid}_${currentUserUid}`;
      roomsMap[defaultRoomId] = {
        conversationId: defaultRoomId,
        name: adminUser.displayName,
        lastSenderName: adminUser.displayName,
        info: "Start a conversation",
        avatarSrc: adminUser.photoURL,
        status: "online",
      };
    }

    return Object.values(roomsMap);
  };

  // processFetchedMessages(
  //   fetchedMessages: any[],
  //   userId: string,
  //   adminUser: any,
  //   onNewConversations: (conversations: any[]) => void,
  // ) {
  //   const generatedConversations = generateConversationsFromMessages(
  //     fetchedMessages,
  //     userId,
  //     adminUser,
  //   );
  //   onNewConversations(generatedConversations);
  // }

  // onConversations(
  //   userId: string,
  //   onNewConversations: (conversations: any[]) => void,
  // ): () => void {
  //   if (!userId) {
  //     console.error("User ID not provided.");
  //     return () => {};
  //   }

  //   return this.onMessages(userId, (fetchedMessages) => {
  //     (async () => {
  //       const adminUser = this.adminUser;
  //       if (!adminUser) {
  //         console.error("Admin user not found.");
  //         return;
  //       }

  //       this.processFetchedMessages(
  //         fetchedMessages,
  //         userId,
  //         adminUser,
  //         onNewConversations,
  //       );
  //     })();
  //   });
  // }

  private static async fetchAdminUser(): Promise<AdminUser | null> {
    try {
      const usersRef = collection(db, "users");
      const adminQuery = query(usersRef, where("role.isAdmin", "==", true));

      const querySnapshot = await getDocs(adminQuery);
      const adminUsers: AdminUser[] = [];
      querySnapshot.forEach((doc) => {
        adminUsers.push(doc.data() as AdminUser);
      });

      return adminUsers.length > 0 ? adminUsers[0] : null;
    } catch (err) {
      console.error("Error fetching admin user: ", err);
      return null;
    }
  }
  async deleteApp(): Promise<void> {
    try {
      await deleteApp(app);
    } catch (error) {
      console.error("Error deleting Firebase app:", error);
    }
  }
}

export default FirebaseService;
