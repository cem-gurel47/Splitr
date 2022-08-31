import React from "react";
import {
  HStack,
  Button,
  Text,
  Icon,
  VStack,
  IconButton,
  PresenceTransition,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
const BOTTOM_TOB_VISIBLE_ROUTES = ["Home", "Final Report", "Settings"];

const BottomTab = (props: BottomTabBarProps) => {
  const { state, descriptors } = props;
  const navigation = useNavigation();

  //const { navigation, state } = props;
  const onPress = (routeName: "Home" | "Final Report" | "Settings") => {
    navigation.navigate(routeName);
  };

  const currentRoute = state.routes[state.index].name;

  return (
    <HStack
      justifyContent="space-evenly"
      py={3}
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
          <VStack
            key={route}
            space={1}
            onTouchEnd={() => onPress("Final Report")}
            alignItems="center"
          >
            <IconButton
              marginTop={-12}
              width={16}
              height={16}
              bgColor="#787DE8"
              borderWidth={2}
              borderColor="white"
              shadow={3}
              borderRadius="full"
              style={{ transform: [{ rotate: "360deg" }] }}
              icon={
                <Icon
                  as={MaterialIcons}
                  name="calculate"
                  size="2xl"
                  color="white"
                />
              }
            />
            <Text color={color}>Calculate</Text>
          </VStack>
        );
      })}
    </HStack>
  );
};

export default BottomTab;
