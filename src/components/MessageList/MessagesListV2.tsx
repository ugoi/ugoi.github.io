import React, {
  useState,
  useEffect,
  useCallback,
  ReactElement,
  useRef,
} from "react";
import { Virtuoso } from "react-virtuoso";
import { Box } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { consumers } from "stream";

interface MessageListProps {
  children: React.ReactNode;
}

const MessagesList: React.FC<MessageListProps> = ({ children }) => {
  const [earliestTimestamp, setEarliestTimestamp] = useState<number>(Infinity);
  const [latestTimestamp, setLatestTimestamp] = useState<number>(0);
  const [shouldAutoScroll, setShouldAutoScroll] = useState<boolean>(false);
  const [firstItemIndex, setFirstItemIndex] = useState(1000000);
  const firstRenderRef = useRef(true);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const childrenArray: any[] = React.Children.toArray(children);
    setMessages(childrenArray);

    if (childrenArray.length <= 0) {
      return;
    }

    // If it's the first render, just set the earliest timestamp and return
    if (firstRenderRef.current) {
      const firstChildTimestamp =
        childrenArray[0].props["data-message-timestamp"].toMillis();
      setEarliestTimestamp(firstChildTimestamp);
      firstRenderRef.current = false;
      return;
    }
    let messagesToPrepend = 0;
    let newEarliestTimestamp = earliestTimestamp;

    for (const child of childrenArray) {
      const timestampProp: Timestamp = child.props["data-message-timestamp"];
      const timestamp = timestampProp ? timestampProp.toMillis() : Infinity;

      console.log("timestamp");
      console.log(timestamp);

      console.log("newEarliestTimestamp");
      console.log(newEarliestTimestamp);

      if (timestamp < newEarliestTimestamp) {
        messagesToPrepend += 1;
        // newEarliestTimestamp = timestamp; // Update the earliest timestamp
      } else {
        break; // Stop once we reach messages already accounted for
      }
    }

    const firstChildTimestamp =
      childrenArray[0].props["data-message-timestamp"].toMillis();
    setEarliestTimestamp(firstChildTimestamp);

    const newLatestTimestamp = childrenArray.reduce(
      (latest: number, child: any) => {
        // Assuming child.props['data-message-timestamp'] is a Firestore Timestamp
        const timestampProp: Timestamp = child.props["data-message-timestamp"];

        // Convert Firestore Timestamp to milliseconds
        const timestamp = timestampProp
          ? timestampProp.toMillis()
          : latestTimestamp + 10;

        return timestamp > latest ? timestamp : latest;
      },
      0,
    );

    if (newLatestTimestamp > latestTimestamp) {
      setLatestTimestamp(newLatestTimestamp);
      setShouldAutoScroll(true); // New message is newer, auto-scroll
    } else {
      setShouldAutoScroll(false); // No newer message, don't auto-scroll
    }

    console.log("messagesToPrepend");
    console.log(messagesToPrepend);
    if (messagesToPrepend > 0) {
      setFirstItemIndex((prevIndex) => prevIndex - messagesToPrepend);
      // setEarliestTimestamp(newEarliestTimestamp); // Update the state with the new earliest timestamp
    }
  }, [children]);

  const onFollowOutputHandler = useCallback(
    (atBottom: boolean) => {
      if (atBottom || shouldAutoScroll) {
        return false;
      } else {
        return false;
      }
    },
    [shouldAutoScroll],
  );

  return (
    <Box sx={{ flexGrow: 1, p: 1 }} data-testid="message-list">
      <Virtuoso
        firstItemIndex={firstItemIndex}
        data={messages}
        followOutput={onFollowOutputHandler}
        style={{ height: "100%", width: "100%" }}
        totalCount={messages.length} // Total count is the length of the users array
        initialTopMostItemIndex={messages.length - 1} // Initial topmost item index
        itemContent={(index, user) => {
          return <Box sx={{ pb: 1 }}>{user}</Box>;
        }}
      />
    </Box>
  );
};

export default MessagesList;

// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   ReactElement,
//   useRef,
// } from "react";
// import { Virtuoso } from "react-virtuoso";
// import { Box } from "@mui/material";
// import { Timestamp } from "firebase/firestore";
// import { consumers } from "stream";
// import { generateUsers } from "./data";
// import Message from "../Message/Message";

// interface MessageListProps {
//   children: React.ReactNode;
// }

// const MessagesList: React.FC<MessageListProps> = ({ children }) => {
//   const START_INDEX = 10000;
//   const INITIAL_ITEM_COUNT = 100;

//   const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX);
//   const [firstItemIndex2, setFirstItemIndex2] = useState(1000000);

//   // const [users, setUsers] = useState(() =>
//   //   generateUsers(INITIAL_ITEM_COUNT, START_INDEX),
//   // );

//   const [users, setUsers] = useState<any[]>([]);

//   // Use useEffect to update the users state whenever the children prop changes
//   useEffect(() => {
//     const childrenArray = React.Children.toArray(children);
//     setUsers(childrenArray);
//   }, [children]); // Dependency array with 'children'

//   // const prependItems = useCallback(() => {
//   //   const usersToPrepend = 20;
//   //   const nextFirstItemIndex = firstItemIndex - usersToPrepend;
//   //   const nextFirstItemIndex2 = firstItemIndex2 - usersToPrepend;

//   //   setTimeout(() => {
//   //     setFirstItemIndex(() => nextFirstItemIndex);
//   //     setFirstItemIndex2(() => nextFirstItemIndex2);

//   //     setUsers(() => [
//   //       ...generateUsers(usersToPrepend, nextFirstItemIndex),
//   //       ...users,
//   //     ]);
//   //   }, 500);

//   //   return false;
//   // }, [firstItemIndex, users, setUsers]);

//   console.log("users:");
//   console.log(users);
//   return (
//     <Virtuoso
//       style={{ height: 400 }}
//       firstItemIndex={100000}
//       // initialTopMostItemIndex={INITIAL_ITEM_COUNT - 1}
//       data={users}
//       // startReached={prependItems}
//       itemContent={(index, user) => {
//         return <Box sx={{ pb: 1 }}>{user}</Box>;
//       }}
//     />
//   );
// };

// export default MessagesList;
