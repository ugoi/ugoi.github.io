import React, { useEffect, useState } from "react";
import {
  CometChatUIKit,
  UIKitSettingsBuilder,
  UsersConfiguration,
} from "@cometchat/chat-uikit-react";
import { CometChatUsersWithMessages } from "@cometchat/chat-uikit-react"; //import the component in your App.js file
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { FirebaseService2 } from "../../services/FirebaseService2";
import { useChat } from "../../contexts/ChatContext";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type CometChatConstants = {
  APP_ID: string | undefined;
  REGION: string | undefined;
};

const COMETCHAT_CONSTANTS: CometChatConstants = {
  APP_ID: process.env.REACT_APP_COMETCHAT_APP_ID, // Replace with your App ID
  REGION: process.env.REACT_APP_COMETCHAT_REGION, // Replace with your App Region
};

if (!COMETCHAT_CONSTANTS.APP_ID || !COMETCHAT_CONSTANTS.REGION) {
  throw new Error(
    "CometChat configuration is missing required environment variables.",
  );
}

// Create the builder
const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .subscribePresenceForFriends()
  .build();

// Attempt to initialize CometChat UIKit
const initResult = CometChatUIKit.init(UIKitSettings);

if (initResult) {
  // Since initResult is not undefined, we can safely call .then() and .catch()
  initResult
    .then(() => {
      console.log("Initialization completed successfully");
    })
    .catch((error: Error) => {
      console.log(error);
    });
} else {
  // Handle the case where init does not return a promise (i.e., returns undefined)
  console.error("Failed to initialize CometChat UIKit");
}

// let usersRequestBuilder = new CometChat.UsersRequestBuilder().setLimit(20).friendsOnly(true)

// Extend the UsersConfiguration type to make additional properties optional
interface ExtendedUsersConfiguration extends Partial<UsersConfiguration> {
  usersRequestBuilder: CometChat.UsersRequestBuilder;
}

const MyCometChat: React.FC = () => {
  console.log("First Render");
  const [loggedInUser, setLoggedInUser] = useState<any>();
  // const [authToken, setAuthToken] = useState<string>();
  const [firebaseService, setFirebaseService] = useState<any>();
  const { authToken, setAuthToken } = useChat();
  const theme = useTheme(); // Access the theme context
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm")); // Check if the current viewport matches a mobile view

  useEffect(() => {
    async function initializeFirebase() {
      try {
        console.log("Initializing FirebaseService2");
        const FirebaseSettings = {
          // Your UIKitSettings configuration
          APP_ID: "YOUR_APP_ID",
          REGION: "YOUR_REGION",
        };
        console.log("FirebaseSettings", FirebaseSettings);
        await FirebaseService2.init(FirebaseSettings);
        setFirebaseService(true);
        console.log("FirebaseService2 initialized successfully");
        // You can now use FirebaseService2 instance in this component
      } catch (error) {
        console.error("Error initializing FirebaseService2:", error);
      }
    }

    initializeFirebase();
  }, []);

  useEffect(() => {
    if (!firebaseService) {
      return;
    }
    (async () => {
      try {
        console.log("Getting Auth Token");
        const token = await FirebaseService2.getAuthToken();
        console.log("AUTH TOKEN!!!", token);
        setAuthToken(token);
      } catch (error) {
        console.error("Error getting Auth Token:", error);
      }
    })();
  }, [firebaseService]);

  useEffect(() => {
    // Create user function
    console.log("FirebaseService2", firebaseService);
    console.log("authToken", authToken);
    if (!firebaseService || !authToken) {
      return;
    }

    const UID = authToken;
    console.log("UID", UID);

    CometChatUIKit.getLoggedinUser().then((user: any) => {
      if (!user) {
        //Login user
        CometChatUIKit.loginWithAuthToken(UID)
          .then((user: any) => {
            console.log("Login Successful:", { user });
            setLoggedInUser(user);
            //mount your app
          })
          .catch(console.log);
      } else {
        //mount your app
        console.log("User already logged in:", { user });
        setLoggedInUser(user);
      }
    });
  }, [firebaseService, authToken]);

  console.log("Loggedin User", loggedInUser);

  let limit = 30;
  // If undefined set roles to empty array
  let roles: string[];
  if (loggedInUser?.role === undefined) {
    roles = ["none"];
  } else {
    roles = loggedInUser.role === "admin" ? ["default"] : ["admin"];
  }
  const usersRequestBuilder = new CometChat.UsersRequestBuilder()
    .setLimit(limit)
    .setRoles(roles);
  // Use the extended type with type assertion
  const usersConfiguration: ExtendedUsersConfiguration = {
    usersRequestBuilder: usersRequestBuilder,
  };

  return (
    <CometChatUsersWithMessages
      usersConfiguration={usersConfiguration as UsersConfiguration}
      isMobileView={isMobileView}
    />
  );
};

export default MyCometChat;
