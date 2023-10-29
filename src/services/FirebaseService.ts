import { app, db } from "../firebase-config";
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

class FirebaseService implements IChatService {
  private messagesRef = collection(db, "messages");

  async sendMessage(roomId: string, text: string, user: any): Promise<void> {
    if (!roomId || !text.trim()) {
      console.error("Invalid room ID or message text.");
      return;
    }

    if (!user) {
      console.error("User data not available.");
      return;
    }

    try {
      await addDoc(this.messagesRef, {
        text: text,
        createdAt: serverTimestamp(),
        userName: user.displayName,
        userUid: user.uid,
        room: roomId,
        photoURL: user.photoURL,
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  }

  onMessages(
    userId: string,
    onNewMessages: (messages: any[]) => void,
  ): () => void {
    if (!userId) {
      console.error("User ID not provided.");
      return () => {};
    }

    let unsubscribe: () => void = () => {};

    (async () => {
      const adminUser = await this.fetchAdminUser();
      if (!adminUser) {
        console.error("Admin user not found.");
        return;
      }

      let queryMessages;

      // Check if the authenticated user is the admin
      if (userId === adminUser.uid) {
        queryMessages = query(this.messagesRef, orderBy("createdAt"));
      } else {
        queryMessages = query(
          this.messagesRef,
          where("room", "==", `${adminUser.uid}_${userId}`),
          orderBy("createdAt"),
        );
      }

      unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        const fetchedMessages: any[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetchedMessages.push({ ...data, id: doc.id });
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

  private async fetchAdminUser(): Promise<any | null> {
    try {
      const usersRef = collection(db, "users");
      const adminQuery = query(usersRef, where("role.isAdmin", "==", true));

      const querySnapshot = await getDocs(adminQuery);
      const adminUsers: any[] = [];
      querySnapshot.forEach((doc) => {
        adminUsers.push(doc.data());
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

const firebaseService = new FirebaseService();
export default firebaseService;
