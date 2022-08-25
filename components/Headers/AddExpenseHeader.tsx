import React from "react";
import { Center, Icon, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddExpenseHeader = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate("Home");
  };

  return (
    <Center
      style={{
        backgroundColor: "#787DE8",
      }}
      borderBottomLeftRadius={60}
      borderBottomRightRadius={60}
      pt={12}
      pb={8}
      px={6}
      mb={4}
      position="relative"
    >
      <Icon
        onPress={goBack}
        as={AntDesign}
        size="lg"
        name="leftcircleo"
        color="white"
        position="absolute"
        left={6}
        top="175%"
      />
      <Text color="white" fontWeight="bold" fontSize="xl">
        Add Expense
      </Text>
    </Center>
  );
};

export default AddExpenseHeader;
