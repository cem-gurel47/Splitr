import React, { createContext, useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { isDevice } from "expo-device";
import { Subscription } from "@unimodules/core";
import { useNavigation } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function schedulePushNotification() {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Report is ready!",
      body: "Tap to see your report 👋",
      data: {
        screenName: "Final Report",
      },
      // sound: 'default',
    },
    trigger: {
      seconds: 2678400,
      repeats: true,
    },
  });

  return id;
}

async function registerForPushNotificationsAsync() {
  let token;
  if (isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: "true",
      lightColor: "#FF231F7C",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: true,
    });
  }

  return token;
}

export async function cancelNotification(notifId: string) {
  await Notifications.cancelScheduledNotificationAsync(notifId);
}

export async function getScheduledNotificationsAsync() {
  const notifs = await Notifications.getAllScheduledNotificationsAsync();
  return notifs;
}

export async function deleteAllScheduledNotifications() {
  const notifs = await Notifications.getAllScheduledNotificationsAsync();
  notifs.forEach((notif) => {
    cancelNotification(notif.identifier);
  });
}

export const NotificationContext = createContext({});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigation = useNavigation();
  const [_, setExpoPushToken] = useState<undefined | string>("");
  const [notification, setNotification] = useState<
    undefined | Notifications.Notification
  >();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    getScheduledNotificationsAsync().then((notifs) => {
      if (notifs.length === 0) {
        schedulePushNotification();
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // console.log("notif received", notification);
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log("notif response", response);
        navigation.navigate("Final Report");
      });

    return () => {
      if (notificationListener.current && responseListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
