import React, { useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import { NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
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
import { NotificationProvider } from "@contexts/NotificationContext";
import * as SQLite from "expo-sqlite";
import Toast from "react-native-toast-message";
import BottomTab from "@components/BottomTab";
import * as NavigationBar from "expo-navigation-bar";

const Tab = createBottomTabNavigator();

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
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

  useEffect(() => {
    navigationConfig();
  }, [barVisibility]);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#787DE8" />
      <NativeBaseProvider>
        <NotificationProvider>
          <ThemeProvider db={db}>
            <ExpenseProvider db={db}>
              <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                  headerShown: false,
                  tabBarHideOnKeyboard: true,
                }}
                tabBar={(props) => <BottomTab {...props} />}
              >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Final Report" component={FinalReportScreen} />
                <Tab.Screen name="Person Expenses" component={PersonExpenses} />
                <Tab.Screen name="Add New Person" component={AddPersonScreen} />
                <Tab.Screen
                  name="Add New Expense"
                  component={AddExpenseScreen}
                />
                <Tab.Screen name="Select Currency" component={SelectCurrency} />
                <Tab.Screen name="Settings" component={Settings} />
              </Tab.Navigator>
            </ExpenseProvider>
          </ThemeProvider>
        </NotificationProvider>
      </NativeBaseProvider>
      <Toast />
    </NavigationContainer>
  );
}
