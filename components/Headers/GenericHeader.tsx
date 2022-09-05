import React from "react";
import { HStack, Icon, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const AddPersonHeader = ({ label }: { label: string }) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <HStack
      safeArea
      style={{
        backgroundColor: "#787DE8",
      }}
      borderBottomLeftRadius={60}
      borderBottomRightRadius={60}
      pt={4}
      pb={12}
      px={6}
      mb={4}
      justifyContent="space-between"
      alignItems="center"
    >
      <TouchableOpacity onPress={goBack}>
        <Icon as={AntDesign} size="xl" name="leftcircleo" color="white" />
      </TouchableOpacity>
      <Text color="white" fontWeight="bold" fontSize="xl">
        {label}
      </Text>
      <Icon
        onPress={goBack}
        as={AntDesign}
        size="xl"
        name="leftcircleo"
        color="transparent"
      />
    </HStack>
  );
};

export default AddPersonHeader;
