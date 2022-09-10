import React, { useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { TouchableOpacity, Alert } from "react-native";
import { HStack, Icon, Text } from "native-base";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const PersonExpenseHeader = ({ name, id }: { name: string; id: number }) => {
  const navigation = useNavigation();
  const { deletePerson } = useContext(ExpenseContext);

  const goBack = () => {
    navigation.navigate("Home");
  };

  const onDelete = () => {
    Alert.alert(
      `Delete ${name}?`,
      `This will remove all data relating to ${name} and his/her expenses. This action cannot be reversed. Deleted data can not be recovered.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deletePerson(id);
            navigation.navigate("Home");
            Toast.show({
              type: "success",
              text1: `${name} is deleted!`,
            });
            navigation.navigate("Home");
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <>
      <HStack
        style={{
          backgroundColor: "#787DE8",
        }}
        safeArea
        borderBottomLeftRadius={60}
        borderBottomRightRadius={60}
        pt={4}
        pb={4}
        px={6}
        mb={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <TouchableOpacity onPress={goBack}>
          <Icon as={AntDesign} size="xl" name="leftcircleo" color="white" />
        </TouchableOpacity>
        <Text color="white" fontWeight="bold" fontSize="xl">
          {name}
        </Text>
        <TouchableOpacity onPress={onDelete}>
          <Icon as={AntDesign} size="xl" name="delete" color="white" />
        </TouchableOpacity>
      </HStack>
    </>
  );
};

export default PersonExpenseHeader;
