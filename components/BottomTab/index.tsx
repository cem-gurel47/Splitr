import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity, Platform, Keyboard } from "react-native";
import { ThemeContext } from "@contexts/ThemeContext";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { HStack, Button, Text, Icon, VStack, IconButton } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const BOTTOM_TOB_VISIBLE_ROUTES = ["Home", "Final Report", "Settings"];

const BottomTab = (props: BottomTabBarProps) => {
  const { state } = props;
  const navigation = useNavigation();
  const { themeLoading } = useContext(ThemeContext);
  const { loading, currency } = useContext(ExpenseContext);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let keyboardEventListeners: any[] = [];
    if (Platform.OS === "android") {
      keyboardEventListeners = [
        Keyboard.addListener("keyboardDidShow", () => setVisible(false)),
        Keyboard.addListener("keyboardDidHide", () => setVisible(true)),
      ];
    }
    return () => {
      if (Platform.OS === "android") {
        keyboardEventListeners &&
          keyboardEventListeners.forEach((eventListener) =>
            eventListener.remove()
          );
      }
    };
  }, []);

  //const { navigation, state } = props;
  const onPress = (routeName: "Home" | "Final Report" | "Settings") => {
    navigation.navigate(routeName);
  };

  const currentRoute = state.routes[state.index].name;

  if (loading || themeLoading || !currency) {
    return null;
  }

  if (!visible) {
    return null;
  }

  return (
    <HStack
      justifyContent="space-evenly"
      py={3}
      _dark={{
        bgColor: "#24242D",
      }}
      borderTopWidth={2}
      borderTopColor="#787DE8"
    >
      {BOTTOM_TOB_VISIBLE_ROUTES.map((route, index) => {
        const iconFamily = route === "Home" ? Entypo : Ionicons;
        const iconName = route === "Home" ? "home" : "ios-settings";
        const color = route === currentRoute ? "#787DE8" : "warmGray.400";
        if (index % 2 === 0) {
          return (
            <Button
              key={route}
              variant="unstyled"
              //@ts-ignore
              onPress={() => onPress(route)}
              color={color}
            >
              <VStack justifyContent="center" alignItems="center" space={1}>
                <Icon as={iconFamily} name={iconName} size="md" color={color} />
                <Text color={color}>{route}</Text>
              </VStack>
            </Button>
          );
        }
        return (
          <TouchableOpacity
            onPress={() => {
              onPress("Final Report");
            }}
            key={route}
          >
            <IconButton
              onPress={() => {
                onPress("Final Report");
              }}
              bgColor="#787DE8"
              borderWidth={2}
              borderColor="white"
              borderRadius="full"
              icon={
                <Icon
                  as={MaterialIcons}
                  name="calculate"
                  size="3xl"
                  color="white"
                />
              }
            />
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
};

export default BottomTab;
