import "../../styles/Chat.css";
import "../../App.css";
import ChatContainer from "../ChatContainer/ChatContainer";
import MessageInput from "../MessageInput/MessageInput";
import Message from "../Message/Message";
import Sidebar from "../Sidebar/Sidebar";
import ConversationList from "../ConversationList/ConversationList";
import Conversation from "../Conversation/Conversation";
import MainContainer from "../MainContainer/MainContainer";
import { useChat } from "../../hooks/useChat";
import ConversationHeader from "../ConversationHeader/ConversationHeader";
import { Avatar, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import MessagesList from "../MessageList/MessagesListV2";

export const ChatComponent = () => {
  const {
    currentMessages,
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    getUser,
  } = useChat(); // Use the custom hook here

  // const handleSelect = (conversationId: string) => {
  //   setActiveConversation(conversationId);
  // };

  const [showSidebar, setShowSidebar] = useState(true);
  const theme = useTheme();

  const handleBackClick = () => {
    setShowSidebar(true);
    setActiveConversation(null);
  };

  const handleSelect = (conversationId: string) => {
    const selectedConversation = conversations.find(
      (conv) => conv.conversationId === conversationId,
    );
    if (selectedConversation) {
      setActiveConversation(selectedConversation);
      setShowSidebar(false);
    } else {
      console.warn(`No conversation found with id: ${conversationId}`);
    }
  };

  const onSend = (text: string) => {
    if (activeConversation?.conversationId) {
      sendMessage(activeConversation.conversationId, text);
    }
  };

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <MainContainer>
      <Sidebar
        sx={{ display: { xs: showSidebar ? "block" : "none", md: "block" } }}
      >
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
              active={
                activeConversation?.conversationId ===
                conversation.conversationId
              }
              onSelect={handleSelect}
            />
          ))}
        </ConversationList>
      </Sidebar>
      <ChatContainer
        sx={{ display: { xs: showSidebar ? "none" : "flex", md: "flex" } }}
      >
        <ConversationHeader>
          {!isDesktop && <ConversationHeader.Back onClick={handleBackClick} />}
          <Avatar src={activeConversation?.avatarSrc} />
          <ConversationHeader.Content
            userName={activeConversation?.name}
            info=""
          />
        </ConversationHeader>
        {/* <MessageList>
          {currentMessages
            .filter(
              (message) => message.room === activeConversation?.conversationId,
            )
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
        </MessageList> */}
        {/* <Messages messages={transformedMessages}/> */}
        <MessagesList>
          {currentMessages
            .filter(
              (message) => message.room === activeConversation?.conversationId,
            )
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
        </MessagesList>

        <MessageInput onSend={onSend} />
      </ChatContainer>
    </MainContainer>
  );
};
