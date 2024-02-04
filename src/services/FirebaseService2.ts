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

class FirebaseService2 {
  private currentUser: any;


  async initialize(): Promise<void> {
    this.currentUser = await FirebaseService2.fetchCurrentUser();
  }

  private static async fetchCurrentUser(): Promise<any | null> {
    try {
      if (!auth.currentUser) {
        console.error("No user is currently logged in.");
        return null;
      }
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("uid", "==", auth.currentUser?.uid));

      const querySnapshot = await getDocs(userQuery);
      const user = querySnapshot.docs[0].data();
      return user;
    } catch (err) {
      console.error("Error fetching current user: ", err);
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

  getCurrentUser(): any | null {
    return this.currentUser;
  }
}

export default FirebaseService2;
