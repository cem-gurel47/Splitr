import React from "react";
import { HStack, Icon, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const FinalReportHeader = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.navigate("Home");
  };
  return (
    <HStack
      safeArea
      pt={4}
      mb={8}
      justifyContent="space-between"
      alignItems="center"
    >
      <TouchableOpacity onPress={goBack}>
        <Icon as={AntDesign} size="xl" name="leftcircleo" color="white" />
      </TouchableOpacity>
      <Text color="white" fontWeight="bold" fontSize="xl">
        Final Report
      </Text>
      <Icon
        onPress={goBack}
        as={AntDesign}
        size="lg"
        name="leftcircleo"
        color="transparent"
      />
    </HStack>
  );
};

export default FinalReportHeader;
