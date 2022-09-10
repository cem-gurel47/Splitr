import React, { useContext } from "react";
import { Alert } from "react-native";
import { ThemeContext } from "@contexts/ThemeContext";
import { ExpenseContext } from "@contexts/ExpenseContext";
import Layout from "@components/Box/Layout";
import { Icon, VStack, HStack, Switch } from "native-base";
import {
  MaterialIcons,
  AntDesign,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import GenericHeader from "@components/Headers/GenericHeader";
import Text from "@components/ThemableText";
import Toast from "react-native-toast-message";

const Settings = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  const { deleteEveryPerson, persons, updatePerson, getExpenses } =
    useContext(ExpenseContext);

  const navigation = useNavigation();

  const SETTINGS_ITEMS = [
    {
      label: "Add New Person",
      icon: (
        <Icon
          as={MaterialIcons}
          name="payment"
          size="xl"
          color="#777CEF"
          _dark={{
            color: "warmGray.50",
          }}
        />
      ),
      onPress: () => {
        navigation.navigate("Add New Person");
      },
    },
    {
      label: "Delete All People",
      icon: (
        <Icon
          as={AntDesign}
          size="xl"
          name="deleteusergroup"
          _dark={{
            color: "warmGray.50",
          }}
          color="#777CEF"
        />
      ),
      onPress: () => {
        Alert.alert(
          "Delete All People",
          "This will remove all data relating to users and their expenses. This action cannot be reversed. Deleted data can not be recovered.",
          [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                deleteEveryPerson();
                Toast.show({
                  type: "success",
                  text1: "All users and expenses are deleted!",
                });
              },
            },
          ]
        );
      },
    },
    {
      label: "Delete All Expenses",
      icon: (
        <Icon
          as={MaterialIcons}
          size="6"
          name="money-off"
          _dark={{
            color: "warmGray.50",
          }}
          color="#777CEF"
        />
      ),
      onPress: () => {
        Alert.alert(
          "Delete All Expenses",
          "This will remove all data relating to expenses but user profiles will be kept safe. This action cannot be reversed. Deleted data can not be recovered.",
          [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                persons.forEach((person) => {
                  updatePerson(person.id, person.name, []);
                });
                getExpenses();
                Toast.show({
                  type: "success",
                  text1: "All expenses are deleted!",
                });
              },
            },
          ]
        );
      },
    },
    {
      label: "Change Currency",
      icon: (
        <Icon
          as={Fontisto}
          size="xl"
          name="money-symbol"
          _dark={{
            color: "warmGray.50",
          }}
          color="#777CEF"
        />
      ),
      onPress: () => {
        navigation.navigate("Select Currency");
      },
    },
    {
      label: "Toggle Theme",
      icon: (
        <Icon
          as={MaterialCommunityIcons}
          name="theme-light-dark"
          size="xl"
          _dark={{
            color: "warmGray.50",
          }}
          color="#777CEF"
        />
      ),
      onPress: () => {
        updateTheme(theme === "light" ? "dark" : "light");
      },
      rightComponent: (
        <Switch
          colorScheme={"blue"}
          size="md"
          isChecked={theme === "light"}
          aria-label={
            theme === "light" ? "switch to dark mode" : "switch to light mode"
          }
        />
      ),
    },
  ];

  return (
    <Layout>
      <GenericHeader label="Settings" />
      <VStack space={4} px={6} alignItems="flex-start">
        {SETTINGS_ITEMS.map(({ label, onPress, icon, rightComponent }) => (
          <HStack
            key={label}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            onTouchEnd={onPress}
          >
            <HStack
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              {icon}
              <Text
                color="#777CEF"
                fontSize="xl"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                {label}
              </Text>
            </HStack>
            {rightComponent ?? (
              <Icon
                as={AntDesign}
                name="rightcircleo"
                size="lg"
                _dark={{
                  color: "warmGray.50",
                }}
                color="#777CEF"
              />
            )}
          </HStack>
        ))}
      </VStack>
    </Layout>
  );
};

export default Settings;
