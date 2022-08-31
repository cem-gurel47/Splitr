import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import { NativeBaseProvider, extendTheme, Button } from "native-base";
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
import { Person } from "@models/person";
import * as SQLite from "expo-sqlite";
import Toast from "react-native-toast-message";
import BottomTab from "@components/BottomTab";
import * as NavigationBar from "expo-navigation-bar";

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

  NavigationBar.addVisibilityListener(({ visibility }) => {
    if (visibility === "visible") {
      setBarVisibility(visibility);
    }
  });
  useEffect(() => {
    navigationConfig();
  }, [barVisibility]);

  const navigationConfig = async () => {
    // Just incase it is not hidden
    NavigationBar.setBackgroundColorAsync("white");
    NavigationBar.setButtonStyleAsync("dark");

    // Hide it
    NavigationBar.setVisibilityAsync("hidden");
  };
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
      </NativeBaseProvider>
      <Toast />
    </NavigationContainer>
  );
}

// Color Switch Component

// function ToggleDarkMode({
//   setTheme,
// }: {
//   setTheme: React.Dispatch<
//     React.SetStateAction<"dark" | "light" | null | undefined>
//   >;
// }) {
//   const { colorMode, toggleColorMode } = useColorMode();
//   return (
//     <Switch
//       isChecked={colorMode === "light"}
//       onToggle={() => {
//         toggleColorMode();
//         setTheme(colorMode === "light" ? "dark" : "light");
//       }}
//       aria-label={
//         colorMode === "light" ? "switch to dark mode" : "switch to light mode"
//       }
//     />
//   );
// }
