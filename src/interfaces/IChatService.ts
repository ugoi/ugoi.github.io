interface IChatService {
  sendMessage(roomId: string, text: string): Promise<void>;

  /**
   * Fetches messages and listens for real-time updates.
   * @param userId The ID of the user.
   * @param onNewMessages Callback function to handle new messages.
   * @returns A function to unsubscribe from real-time updates.
   */
  onMessages(onNewMessages: (messages: any[]) => void): () => void;

  deleteApp(): void;
}

export default IChatService;
