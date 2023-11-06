import { Message } from "../services/Types";

// export const generateConversationsFromMessages = (
//   messages: Message[],
//   currentUserUid: string,
//   adminUser: any,
// ) => {
//   let roomsMap: { [key: string]: any } = {}; // To store unique rooms

//   messages.forEach((message) => {
//     if (currentUserUid === adminUser.uid) {
//       if (!roomsMap[message.room]) {
//         roomsMap[message.room] = {
//           conversationId: message.room,
//           name: message.userName,
//           lastSenderName: message.userName,
//           info: message.text,
//           avatarSrc: message.photoURL,
//           status: "online",
//         };
//       }
//     }
//   });

//   if (currentUserUid !== adminUser.uid) {
//     const defaultRoomId = `${adminUser.uid}_${currentUserUid}`;
//     roomsMap[defaultRoomId] = {
//       conversationId: defaultRoomId,
//       name: adminUser.displayName,
//       lastSenderName: adminUser.displayName,
//       info: "Start a conversation",
//       avatarSrc: adminUser.photoURL,
//       status: "online",
//     };
//   }

//   return Object.values(roomsMap);
// };

// export const fetchAdminUser = async () => {
//   try {
//     const usersRef = collection(db, "users");
//     const adminQuery = query(usersRef, where("role.isAdmin", "==", true));

//     const querySnapshot = await getDocs(adminQuery);
//     const adminUsers: any[] = [];
//     querySnapshot.forEach((doc) => {
//       adminUsers.push(doc.data());
//     });

//     return adminUsers.length > 0 ? adminUsers[0] : null;
//   } catch (err) {
//     console.error("Error fetching admin user: ", err);
//     return null;
//   }
// };
