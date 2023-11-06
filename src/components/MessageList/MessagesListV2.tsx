import React, { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import { Box } from "@mui/material";

interface MessageListProps {
  children: React.ReactNode;
}

const MessagesList: React.FC<MessageListProps> = ({ children }) => {
  // Convert ReactNode children to an array of elements.
  const childrenArray = React.Children.toArray(children);

  const onFollowOutputHandler = useCallback((atBottom: any) => {
    if (atBottom || true) {
      return "auto";
    } else {
      return false;
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 1 }} data-testid="message-list">
      <Virtuoso
        data={childrenArray}
        followOutput={onFollowOutputHandler}
        style={{ height: "100%", width: "100%" }}
        totalCount={childrenArray.length}
        initialTopMostItemIndex={childrenArray.length - 1} // Set initialTopMostItemIndex to the last item
        itemContent={(index) => (
          <Box sx={{ pb: 1 }}>{childrenArray[index]}</Box>
        )}
      />
    </Box>
  );
};

export default MessagesList;
