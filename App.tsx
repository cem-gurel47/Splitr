import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import { NativeBaseProvider, extendTheme } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  FinalReportScreen,
  AddExpenseScreen,
  AddPersonScreen,
  PersonExpenses,
  SelectCurrency,
  Settings,
} from "@screens/index";
import { ExpenseProvider } from "@contexts/ExpenseContext";
import { ThemeProvider } from "@contexts/ThemeContext";
import { Person } from "@models/person";
import * as SQLite from "expo-sqlite";
import Toast from "react-native-toast-message";
import BottomTab from "@components/BottomTab";
import * as NavigationBar from "expo-navigation-bar";
import * as Notifications from "expo-notifications";

export type StackParamList = {
  Home: undefined;
  "Final Report": undefined;
  "Person Expenses": Person;
  "Add New Person": undefined;
  "Add New Expense": {
    personId?: number;
  };
  "Select Currency": undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

const openDatabase = () => {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }
  const db = SQLite.openDatabase("db.db");
  return db;
};

export const db = openDatabase();

export default function App() {
  const [barVisibility, setBarVisibility] = useState<undefined | string>();
  const [expoPushToken, setExpoPushToken] = useState<string>();

  NavigationBar.addVisibilityListener(({ visibility }) => {
    if (visibility === "visible") {
      setBarVisibility(visibility);
    }
  });

  const navigationConfig = async () => {
    // Just incase it is not hidden
    NavigationBar.setBackgroundColorAsync("white");
    NavigationBar.setButtonStyleAsync("dark");

    // Hide it
    NavigationBar.setVisibilityAsync("hidden");
  };

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert(
        "You will not get monthly notifications. You can change this from the settings."
      );
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    setExpoPushToken(token);

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  useEffect(() => {
    navigationConfig();
  }, [barVisibility]);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#787DE8" />
      <NativeBaseProvider
        config={{
          dependencies: {
            "linear-gradient": LinearGradient,
          },
        }}
      >
        <ThemeProvider db={db}>
          <ExpenseProvider db={db}>
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
              }}
              tabBar={(props) => <BottomTab {...props} />}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Final Report" component={FinalReportScreen} />
              <Tab.Screen name="Person Expenses" component={PersonExpenses} />
              <Tab.Screen name="Add New Person" component={AddPersonScreen} />
              <Tab.Screen name="Add New Expense" component={AddExpenseScreen} />
              <Tab.Screen name="Select Currency" component={SelectCurrency} />
              <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
          </ExpenseProvider>
        </ThemeProvider>
      </NativeBaseProvider>
      <Toast />
    </NavigationContainer>
  );
}

// Color Switch Component
