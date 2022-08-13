import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@screens/Home";
import FinalReportScreen from "@screens/FinalReport";
import AddManuallyScreen from "@screens/AddManually";
const Stack = createNativeStackNavigator();

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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Final Report" component={FinalReportScreen} />
          <Stack.Screen name="John Doe" component={AddManuallyScreen} />
        </Stack.Navigator>
      </NativeBaseProvider>
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
