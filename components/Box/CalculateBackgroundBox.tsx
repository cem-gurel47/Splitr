import React from "react";
import { Image } from "react-native";
import BG from "@assets/calculate-background.png";
import { Box, Pressable, Text, Icon, HStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const CalculateBackgroundBox = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Final Report");
      }}
    >
      <Box justifyContent="center" alignItems="center" position="relative">
        <Image
          source={BG}
          style={{
            flex: 1,
            resizeMode: "cover",
          }}
        />
        <HStack
          px={4}
          top="22%"
          position="absolute"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text w={"75%"} color="white" fontWeight="medium" fontSize="xl">
            See how much you owe each other
          </Text>
          <Icon size="sm" as={<AntDesign name="right" />} color="white" />
        </HStack>
      </Box>
    </Pressable>
  );
};

export default CalculateBackgroundBox;
