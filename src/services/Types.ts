export type SendMessageServiceParams = {
  message: string;
  conversationId: string;
};

export type Message = {
  id: string;
  userName: string;
  text: string;
  userUid: string;
  room: string;
  photoURL: string;
};
