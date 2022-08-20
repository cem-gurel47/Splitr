import React from "react";
import { Center, Icon, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FinalReportHeader = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.navigate("Home");
  };
  return (
    <Center position="relative" mb={12}>
      <Icon
        onPress={goBack}
        as={AntDesign}
        size="lg"
        name="leftcircleo"
        color="white"
        position="absolute"
        left={0}
        top="0%"
      />
      <Text color="white" fontWeight="bold" fontSize="xl">
        Final Report
      </Text>
    </Center>
  );
};

export default FinalReportHeader;
