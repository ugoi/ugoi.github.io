import "../../styles/Chat.css";
import "../../App.css";
import ChatContainer from "../ChatContainer/ChatContainer";
import MessageList from "../MessageList/MessageList";
import MessageInput from "../MessageInput/MessageInput";
import Message from "../Message/Message";
import Sidebar from "../Sidebar/Sidebar";
import ConversationList from "../ConversationList/ConversationList";
import Conversation from "../Conversation/Conversation";
import MainContainer from "../MainContainer/MainContainer";
import { useChat } from "../../hooks/useChat";

export const ChatComponent = () => {
  const {
    currentMessages,
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    getUser,
  } = useChat(); // Use the custom hook here

  const handleSelect = (conversationId: string) => {
    setActiveConversation(conversationId);
  };

  const onSend = (text: string) => {
    if (activeConversation) {
      sendMessage(activeConversation, text);
    }
  };

  return (
    <MainContainer>
      <Sidebar>
        <ConversationList>
          {conversations.map((conversation) => (
            <Conversation
              key={conversation.conversationId}
              conversationId={conversation.conversationId.toString()}
              name={conversation.name}
              lastSenderName={conversation.lastSenderName}
              info={conversation.info}
              avatarSrc={conversation.avatarSrc}
              status={conversation.status}
              active={activeConversation === conversation.conversationId}
              onSelect={handleSelect}
            />
          ))}
        </ConversationList>
      </Sidebar>
      <ChatContainer>
        <MessageList>
          {currentMessages
            .filter((message) => message.room === activeConversation)
            .map((message) => (
              <Message
                key={message.id}
                author={message.userName}
                text={message.text}
                direction={
                  message.userUid === getUser()?.uid ? "outgoing" : "incoming"
                }
                avatarSrc={message.photoURL}
              />
            ))}
        </MessageList>

        <MessageInput onSend={onSend} />
      </ChatContainer>
    </MainContainer>
  );
};
