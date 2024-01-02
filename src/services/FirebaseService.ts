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
  limit,
  doc,
  getDoc,
  writeBatch,
  startAfter,
} from "firebase/firestore";
import IChatService from "../interfaces/IChatService";
import { deleteApp } from "firebase/app";
import { AdminUser, Conversation, Message } from "./Types";
import { checkRoomExistenceWithSameUsers } from "./helper";

class FirebaseService implements IChatService {
  private messagesRef = collection(db, "messages");
  private adminUser: AdminUser | null = null;
  private currentUser = auth.currentUser;
  // Store unsubscribe functions for each room listener
  private unsubscribeFunctions: (() => void)[] = [];
  private lastMessage: any = null;

  async initialize(): Promise<void> {
    this.adminUser = await FirebaseService.fetchAdminUser();
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
      // Check if the room exists
      // Split roomId to get the list of userIds
      const userIds = roomId.split("_");

      const roomExists = await this.checkRoomExistence(roomId);

      if (!roomExists) {
        // If the room doesn't exist, add it to userRooms and roomUsers collections
        await this.createRoom(userIds);
      }

      // Proceed to send the message
      await addDoc(this.messagesRef, {
        text: text,
        createdAt: serverTimestamp(),
        userName: currentUser.displayName,
        userUid: currentUser.uid,
        room: roomId,
        photoURL: currentUser.photoURL,
      });
    } catch (err) {
      console.error("Error processing message:", err);
    }
  }

  onMessages(onNewMessages: (messages: Message[]) => void): () => void {
    const currentUserUid = this.currentUser?.uid;

    if (!currentUserUid) {
      console.error("User ID not provided.");
      return () => {};
    }

    this.fetchUserRooms(currentUserUid).then((roomIds) => {
      roomIds.forEach((roomId) => {
        const unsubscribe = this.listenToRoomMessages(roomId, onNewMessages);
        this.unsubscribeFunctions.push(unsubscribe); // Store the unsubscribe function
      });
    });

    // Return a function to unsubscribe all listeners when needed
    return () => {
      this.unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
      this.unsubscribeFunctions = []; // Clear the unsubscribe functions
    };
  }

  async fetchPaginatedMessages(
    roomId: string,
    lastMessageTimestamp: any,
  ): Promise<Message[]> {
    let messagesQuery;

    if (lastMessageTimestamp) {
      // Fetch next 10 messages before the timestamp of the provided last message
      messagesQuery = query(
        this.messagesRef,
        where("room", "==", roomId),
        orderBy("createdAt", "desc"),
        startAfter(lastMessageTimestamp),
        limit(10),
      );
    } else {
      // Fetch the 10 most recent messages
      messagesQuery = query(
        this.messagesRef,
        where("room", "==", roomId),
        orderBy("createdAt", "desc"),
        limit(10),
      );
    }

    const querySnapshot = await getDocs(messagesQuery);
    const messages = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Message[];

    return messages;
  }

  async createRoom(userIds: string[]) {
    console.log("Before room existence");
    if (!(await checkRoomExistenceWithSameUsers(userIds))) {
      console.log("After room existence");
      // Use Firestore batched writes to add the room to userRooms, roomUsers, and rooms
      const batch = writeBatch(db);

      // Define the type for roomUsers as a Record of string to boolean
      const roomUsers: Record<string, boolean> = userIds.reduce(
        (acc, userId) => {
          acc[userId] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      );

      // Generate a new document reference with an auto-generated ID in the 'roomUsers' collection
      const roomUserRef = doc(collection(db, "roomUsers"));
      const roomId = roomUserRef.id;
      batch.set(roomUserRef, roomUsers, { merge: true });

      // Add the room to each user's list of rooms in userRooms collection
      userIds.forEach((userId) => {
        const userRoomRef = doc(db, "userRooms", userId);
        batch.set(userRoomRef, { [roomId]: true }, { merge: true });
      });

      // Create a new document in the rooms collection with the same roomId
      const roomRef = doc(db, "rooms", roomId);
      batch.set(roomRef, {
        type: "direct",
        createdAt: serverTimestamp(), // set the current timestamp
      });

      // Commit the batch
      await batch.commit();
    }
  }

  onRooms(onNewRooms: (conversations: Conversation[]) => void): () => void {
    const currentUserUid = this.currentUser?.uid;
    if (!currentUserUid) {
      console.error("User ID not provided.");
      return () => {}; // Return a no-op function if currentUserUid is not available
    }

    const userRoomsRef = doc(db, "userRooms", currentUserUid);
    const unsubscribe = onSnapshot(userRoomsRef, async (snapshot) => {
      const roomData = snapshot.data();
      let conversations: Conversation[] = [];

      if (roomData) {
        const roomIds = Object.keys(roomData);
        for (const roomId of roomIds) {
          const roomUsersRef = doc(db, "roomUsers", roomId);
          const roomUsersDoc = await getDoc(roomUsersRef);

          if (roomUsersDoc.exists()) {
            const usersInRoomData = roomUsersDoc.data();
            if (usersInRoomData) {
              const usersInRoom = Object.keys(usersInRoomData);
              if (usersInRoom.length === 2) {
                const otherUserId = usersInRoom.find(
                  (id) => id !== currentUserUid,
                );
                if (otherUserId) {
                  const conversation =
                    await this.fetchUserDetailsForConversation(
                      otherUserId,
                      roomId,
                    );
                  if (conversation) {
                    conversations.push(conversation);
                  }
                }
              }
            }
          }
        }
      }

      onNewRooms(conversations);
    });

    // Return the unsubscribe function
    return unsubscribe;
  }

  listenToRoomMessages(
    roomId: string,
    onNewMessages: (messages: Message[]) => void,
  ): () => void {
    const queryMessages = query(
      this.messagesRef,
      where("room", "==", roomId),
      orderBy("createdAt", "desc"),
      limit(20),
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const hasPendingWrites = snapshot.metadata.hasPendingWrites;
      if (!hasPendingWrites) {
        const fetchedMessages: Message[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetchedMessages.push({ ...(data as Message), id: doc.id });
        });
        if (fetchedMessages.length > 0) {
          onNewMessages(fetchedMessages);
        }
      }
    });

    return unsubscribe;
  }

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

  getAdminUser(): AdminUser | null {
    return this.adminUser;
  }

  getCurrentUser(): any | null {
    return this.currentUser;
  }

  async checkRoomExistence(roomId: string) {
    console.log("Start checkRoomExistence");
    // Reference to the room's document in roomUsers collection

    console.log("roomId", roomId);
    const roomsUsersRef = doc(db, "roomUsers", roomId);
    const roomsUsersDoc = await getDoc(roomsUsersRef);

    const existsInRoomsUsers = roomsUsersDoc.exists();

    return existsInRoomsUsers;
  }

  // Method to fetch user details for a conversation
  async fetchUserDetailsForConversation(
    userId: string,
    roomId: string,
  ): Promise<Conversation | null> {
    // Fetch user details
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        conversationId: roomId,
        name: userData.displayName,
        avatarSrc: userData.photoURL,
        lastSenderName: userData.displayName,
        info: "Info",
        status: "online",
      };
    }

    return null;
  }

  async fetchUserRooms(userId: string): Promise<string[]> {
    // Fetch the user's rooms from the userRooms collection
    const userRoomsRef = doc(db, "userRooms", userId);
    const userRoomsDoc = await getDoc(userRoomsRef);

    if (!userRoomsDoc.exists()) {
      return [];
    }

    // Return the list of room IDs
    return Object.keys(userRoomsDoc.data());
  }
}

export default FirebaseService;
