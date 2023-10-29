// import React, { useEffect, useRef } from "react";
// import { List, Box } from "@mui/material";

// interface MessageListProps {
//   children: React.ReactNode;
// }

// const MessageList: React.FC<MessageListProps> = ({ children }) => {
//   const containerRef = useRef<null | HTMLDivElement>(null);

//   useEffect(() => {
//     if (containerRef.current) {
//       const element = containerRef.current;
//       element.scrollTop = element.scrollHeight;
//     }
//   }, [children]);

//   return (
//     <Box ref={containerRef} sx={{ height: "70vh", overflowY: "scroll" }}>
//       <List>
//         {children}
//       </List>
//     </Box>
//   );
// };

// export default MessageList;

// import React, { Children, ReactNode, useEffect, useRef } from "react";
// import { FixedSizeList as List } from "react-window";
// import AutoSizer, { Size } from "react-virtualized-auto-sizer";
// import { Box } from "@mui/material";

// interface MessageListProps {
//   children: ReactNode;
// }

// const MessageList: React.FC<MessageListProps> = ({ children }) => {
//   const containerRef = useRef<null | HTMLDivElement>(null);

//   // Convert children to an array so we can access by index.
//   const childrenArray = Children.toArray(children);

//   useEffect(() => {
//     if (containerRef.current) {
//       const element = containerRef.current;
//       element.scrollTop = element.scrollHeight;
//     }
//   }, [childrenArray]);

//   const Row = ({ index, style }: any) => {
//     return <div style={style}>{childrenArray[index]}</div>;
//   };

//   return (
//     <Box ref={containerRef} sx={{ height: "70vh", overflowY: "scroll" }}>
//       <AutoSizer>
//         {({ width, height }: Size) => (
//           <List
//             height={height}
//             width={width}
//             itemCount={childrenArray.length}
//             itemSize={80} // adjust this to an approx height of your message item
//           >
//             {Row}
//           </List>
//         )}
//       </AutoSizer>
//     </Box>
//   );
// };

// export default MessageList;


import React, { Children, ReactNode, useEffect, useRef } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import { Box } from "@mui/material";

interface MessageListProps {
  children: ReactNode;
}

const MessageList: React.FC<MessageListProps> = ({ children }) => {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const listRef = useRef<any>(null);  // Step 1: Create a ref for the FixedSizeList

  // Convert children to an array so we can access by index.
  const childrenArray = Children.toArray(children);

  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current;
      element.scrollTop = element.scrollHeight;
    }
    if (listRef.current) {
      listRef.current.scrollToItem(childrenArray.length - 1, 'end');  // Step 2: Scroll to the last item whenever childrenArray length changes
    }
  }, [childrenArray]);

  const Row = ({ index, style }: any) => {
    return <div style={style}>{childrenArray[index]}</div>;
  };

  return (
    <Box ref={containerRef} sx={{ height: "70vh", overflowY: "scroll" }}>
      <AutoSizer>
        {({ width, height }: Size) => (
          <List
            ref={listRef}  // Step 3: Pass the ref to the FixedSizeList
            height={height}
            width={width}
            itemCount={childrenArray.length}
            itemSize={80}  // adjust this to an approx height of your message item
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </Box>
  );
};

export default MessageList;
