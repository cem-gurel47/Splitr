import "react-native-gesture-handler";
import React from "react";
import { Platform } from "react-native";
import { NativeBaseProvider, extendTheme } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@screens/Home";
import FinalReportScreen from "@screens/FinalReport";
import PersonExpenses from "@screens/PersonExpenses";
import AddPerson from "@screens/AddPerson";
import AddExpense from "@screens/AddExpense";
import { ExpenseProvider } from "@contexts/ExpenseContext";
import { Person } from "@models/person";
import * as SQLite from "expo-sqlite";
import Toast from "react-native-toast-message";

export type StackParamList = {
  Home: undefined;
  "Final Report": undefined;
  "Person Expenses": Person;
  "Add New Person": undefined;
  "Add New Expense": {
    personId?: number;
  };
};

const Stack = createNativeStackNavigator<StackParamList>();

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
  return (
    <NavigationContainer>
      <NativeBaseProvider
        config={{
          dependencies: {
            "linear-gradient": LinearGradient,
          },
        }}
      >
        <ExpenseProvider db={db}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Final Report" component={FinalReportScreen} />
            <Stack.Screen name="Person Expenses" component={PersonExpenses} />
            <Stack.Screen name="Add New Person" component={AddPerson} />
            <Stack.Screen name="Add New Expense" component={AddExpense} />
          </Stack.Navigator>
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
