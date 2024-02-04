import React, { useEffect, useState } from "react";
import {
  CometChatUIKit,
  UIKitSettingsBuilder,
  UsersConfiguration,
} from "@cometchat/chat-uikit-react";
import { CometChatUsersWithMessages } from "@cometchat/chat-uikit-react"; //import the component in your App.js file
import { CometChat } from "@cometchat/chat-sdk-javascript";
// import { CometChat } from "@cometchat-pro/chat";
import FirebaseService2 from "../../services/FirebaseService2";

type CometChatConstants = {
  APP_ID: string | undefined;
  REGION: string | undefined;
  AUTH_KEY: string | undefined;
};

const COMETCHAT_CONSTANTS: CometChatConstants = {
  APP_ID: process.env.REACT_APP_COMETCHAT_APP_ID, // Replace with your App ID
  REGION: process.env.REACT_APP_COMETCHAT_REGION, // Replace with your App Region
  AUTH_KEY: process.env.REACT_APP_COMETCHAT_AUTH_KEY, // Replace with your Auth Key
};

if (
  !COMETCHAT_CONSTANTS.APP_ID ||
  !COMETCHAT_CONSTANTS.REGION ||
  !COMETCHAT_CONSTANTS.AUTH_KEY
) {
  throw new Error(
    "CometChat configuration is missing required environment variables.",
  );
}

// Create the builder
const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForFriends()
  .build();

// Attempt to initialize CometChat UIKit
const initResult = CometChatUIKit.init(UIKitSettings);

if (initResult) {
  // Since initResult is not undefined, we can safely call .then() and .catch()
  initResult
    .then(() => {
      console.log("Initialization completed successfully");
      // Create user function
      const UID = "superhero1"; //Replace with your UID
      const authKey = COMETCHAT_CONSTANTS.AUTH_KEY; //Replace with your Auth Key

      CometChatUIKit.getLoggedinUser().then((user: any) => {
        if (!user) {
          //Login user
          CometChatUIKit.login(UID)
            .then((user: any) => {
              console.log("Login Successful:", { user });
              //mount your app
            })
            .catch(console.log);
        } else {
          //mount your app
          console.log("User already logged in:", { user });
        }
      });
      // You can now call the login function.
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
  const [firebaseService, setFirebaseService] = useState<FirebaseService2>();

  useEffect(() => {
    (async () => {
      const service = new FirebaseService2();
      await service.initialize();
      setFirebaseService(service);
    })();
  }, []);

  console.log(
    "FirebaseService2",
    firebaseService?.getCurrentUser().role.isAdmin,
  );
  const isAdmin = firebaseService?.getCurrentUser().role.isAdmin;
  console.log("isAdmin", isAdmin);

  let limit = 30;
  // If undefined set roles to empty array
  let roles: string[];
  if (isAdmin === undefined) {
    roles = ["none"];
  } else {
    roles = isAdmin ? ["default"] : ["admin"];
  }
  // let roles = ["default"];
  // let roles = ["admin"];
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
    />
  );
};

export default MyCometChat;
