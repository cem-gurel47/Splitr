import React, { useState, useContext } from "react";
import { ThemeContext } from "@contexts/ThemeContext";
import Layout from "@components/Box/Layout";
import { Icon, VStack, HStack, Switch } from "native-base";
import {
  MaterialIcons,
  AntDesign,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  DeleteAllExpensesAlert,
  DeleteAllUsersAlert,
} from "@components/Alerts";
import GenericHeader from "@components/Headers/GenericHeader";
import Text from "@components/ThemableText";

const Settings = () => {
  const { theme, setTheme, updateTheme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [deleteAllUsersModalVisible, setDeleteAllUsersModalVisible] =
    useState(false);
  const [deleteAllExpensesModalVisible, setDeleteAllExpensesModalVisible] =
    useState(false);

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
      label: "Delete All Persons",
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
        setDeleteAllUsersModalVisible(true);
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
        setDeleteAllExpensesModalVisible(true);
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
          size="lg"
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
      <DeleteAllExpensesAlert
        isOpen={deleteAllExpensesModalVisible}
        setIsOpen={setDeleteAllExpensesModalVisible}
      />
      <DeleteAllUsersAlert
        isOpen={deleteAllUsersModalVisible}
        setIsOpen={setDeleteAllUsersModalVisible}
      />
    </Layout>
  );
};

export default Settings;
