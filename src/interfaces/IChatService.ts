interface IChatService {
  sendMessage(roomId: string, text: string, user: any): Promise<void>;

  /**
   * Fetches messages and listens for real-time updates.
   * @param userId The ID of the user.
   * @param onNewMessages Callback function to handle new messages.
   * @returns A function to unsubscribe from real-time updates.
   */
  fetchMessages(
    userId: string,
    onNewMessages: (messages: any[]) => void,
  ): () => void;

  // You can add other methods here as needed
}

export default IChatService;
