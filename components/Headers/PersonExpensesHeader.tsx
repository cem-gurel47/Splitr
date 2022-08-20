import React from "react";
import { Box, HStack, Image, Text, VStack, Icon } from "native-base";
import ExpenseBackground from "@assets/expense-background.png";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PersonExpensesHeader = ({ name }: { name: string }) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.navigate("Home");
  };

  return (
    <Box w="100%" justifyContent="flex-end" paddingLeft={4} mb={-24}>
      <HStack>
        <VStack safeArea pt={4}>
          <Icon
            onPress={goBack}
            as={AntDesign}
            size="lg"
            name="leftcircleo"
            color="#777CEF"
          />
          <HStack alignItems="center" space={4} mt={4}>
            <Box bgColor="#F5F6FA" p={4} borderRadius="2xl" shadow={9}>
              <Icon
                onPress={goBack}
                as={Ionicons}
                size="lg"
                name="person"
                color="#777CEF"
              />
            </Box>
            <VStack>
              <Text
                style={{
                  color: "#777CEF",
                }}
                fontSize="3xl"
                fontWeight="bold"
              >
                Expenses
              </Text>
              <Text fontSize="2xl">{name}</Text>
            </VStack>
          </HStack>
        </VStack>
        <Image
          source={ExpenseBackground}
          alt="blue background"
          flex={1}
          resizeMode="cover"
        />
      </HStack>
    </Box>
  );
};

export default PersonExpensesHeader;
