import React, { Children, ReactNode, useLayoutEffect, useRef } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import { Box } from "@mui/material";

interface MessageListProps {
  children: ReactNode;
}

const MessageList: React.FC<MessageListProps> = ({ children }) => {
  const listRef = useRef<any>(null); // Create a ref for the FixedSizeList

  // Convert children to an array so we can access by index.
  const childrenArray = Children.toArray(children);

  useLayoutEffect(() => {
    console.log("Scroll TO Bottom");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        listRef.current?.scrollToItem(childrenArray.length, "end");
      });
    });
  }, [childrenArray]);

  const Row = ({ index, style }: any) => {
    return <div style={style}>{childrenArray[index]}</div>;
  };

  return (
    <Box sx={{ height: "70vh", overflowY: "scroll" }}>
      <AutoSizer>
        {({ width, height }: Size) => (
          <List
            ref={listRef} // Pass the ref to the FixedSizeList
            height={height}
            width={width}
            itemCount={childrenArray.length}
            itemSize={80} // adjust this to an approx height of your message item
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </Box>
  );
};

export default MessageList;
