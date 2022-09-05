import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
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

  //const { navigation, state } = props;
  const onPress = (routeName: "Home" | "Final Report" | "Settings") => {
    navigation.navigate(routeName);
  };

  const currentRoute = state.routes[state.index].name;

  if (loading || themeLoading || !currency) {
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
          <TouchableOpacity onPress={() => onPress("Final Report")} key={route}>
            <VStack space={1} alignItems="center">
              <IconButton
                zIndex={2000}
                onPress={() => {
                  console.log("pressed");
                  onPress("Final Report");
                }}
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
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
};

export default BottomTab;
