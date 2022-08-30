import React from "react";
import { IconButton, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  id: number;
};

const AddExpenseStagger = ({ id }: Props) => {
  const navigation = useNavigation();
  return (
    <IconButton
      bgColor="#787DE8"
      colorScheme="blue"
      position="absolute"
      bottom="10%"
      right="10%"
      variant="solid"
      borderRadius="full"
      size="lg"
      onPress={() =>
        navigation.navigate("Add New Expense", {
          personId: id,
        })
      }
      icon={
        <Icon
          as={Ionicons}
          size="xl"
          name="ios-add"
          _dark={{
            color: "white",
          }}
          color="white"
        />
      }
    />
  );
};

export default AddExpenseStagger;
