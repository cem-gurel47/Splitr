import React, { useState } from "react";
import Layout from "@components/Box/Layout";
import { Button, Icon, Text, VStack, HStack } from "native-base";
import { MaterialIcons, AntDesign, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  DeleteAllExpensesAlert,
  DeleteAllUsersAlert,
} from "@components/Alerts";
import GenericHeader from "@components/Headers/GenericHeader";

const Settings = () => {
  const navigation = useNavigation();
  const [deleteAllUsersModalVisible, setDeleteAllUsersModalVisible] =
    useState(false);
  const [deleteAllExpensesModalVisible, setDeleteAllExpensesModalVisible] =
    useState(false);

  const SETTINGS_ITEMS = [
    {
      label: "Add New Person",
      icon: (
        <Icon as={MaterialIcons} name="payment" size="xl" color="#2348FF" />
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
          size="6"
          name="deleteusergroup"
          _dark={{
            color: "warmGray.50",
          }}
          color="#2348FF"
        />
      ),
      onPress: () => {
        setDeleteAllUsersModalVisible(true);
      },
    },
    {
      label: "Change Currency",
      icon: (
        <Icon
          as={Fontisto}
          size="6"
          name="money-symbol"
          _dark={{
            color: "warmGray.50",
          }}
          color="#2348FF"
        />
      ),
      onPress: () => {
        navigation.navigate("Select Currency");
      },
    },
  ];

  return (
    <Layout>
      <GenericHeader label="Settings" />
      <VStack space={2} px={6}>
        {SETTINGS_ITEMS.map(({ label, onPress, icon }, index) => (
          <Button bgColor="transparent" w="65%" key={label} onPress={onPress}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <HStack space={2} width="100%" alignItems="center">
                {icon}
                <Text color="#2348FF" fontSize="xl">
                  {label}
                </Text>
              </HStack>
              <Icon
                as={AntDesign}
                name="rightcircleo"
                size="lg"
                color="#2348FF"
              />
            </HStack>
          </Button>
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
