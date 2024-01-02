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
import { generateUsers } from "../MessageList/data";

export const ChatComponent = () => {
  const {
    currentMessages,
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    getUser,
    lastMessageRef,
  } = useChat(); // Use the custom hook here

  const [showSidebar, setShowSidebar] = useState(true);
  const theme = useTheme();

  const START_INDEX = 10;
  const INITIAL_ITEM_COUNT = 3;

  const [users, setUsers] = useState(() =>
    generateUsers(INITIAL_ITEM_COUNT, START_INDEX),
  );

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
        <MessagesList>
          {currentMessages
            .filter(
              (message) => message.room === activeConversation?.conversationId,
            )
            .map((message, index) => (
              <Message
                key={message.id}
                ref={index === 0 ? lastMessageRef : null}
                data-message-id={message.id}
                data-message-timestamp={message.createdAt} // Add timestamp as a data attribute
                author={message.userName}
                text={message.text}
                direction={
                  message.userUid === getUser()?.uid ? "outgoing" : "incoming"
                }
                avatarSrc={message.photoURL}
              />
            ))}
        </MessagesList>
        {/* <MessagesList>
          {currentMessages.map((message, index) => (
            <Message
              key={1}
              ref={index === 0 ? lastMessageRef : null}
              data-message-id={1}
              data-message-timestamp={2} // Add timestamp as a data attribute
              author={"Stefam"}
              text={"HiXD"}
              direction={"outgoing"}
              avatarSrc={message.photoURL}
            />
          ))}
        </MessagesList> */}

        <MessageInput onSend={onSend} />
      </ChatContainer>
    </MainContainer>
  );
};
