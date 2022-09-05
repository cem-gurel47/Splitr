import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { ExpenseContext } from "@contexts/ExpenseContext";
import {
  Box,
  Text,
  PresenceTransition,
  Icon,
  VStack,
  HStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Person } from "@models/person";
import { AntDesign } from "@expo/vector-icons";
import formatter from "@utils/formatter";
import { BG_COLORS } from "@utils/constants";
export default function PersonBox({
  person,
  index,
}: {
  person: Person;
  index: number;
}) {
  const navigation = useNavigation();
  const { currency } = useContext(ExpenseContext);
  const { name, totalAmount } = person;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Person Expenses", person)}
      style={{ width: "49%" }}
    >
      <PresenceTransition
        visible={true}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 250,
          },
        }}
      >
        <Box
          mb={5}
          bgColor={BG_COLORS[index % BG_COLORS.length]}
          px={4}
          py={6}
          rounded="3xl"
        >
          <HStack justifyContent="space-between" alignItems="center" space={2}>
            <VStack alignItems="flex-start" justifyContent="center" space={2}>
              <Text fontSize="md" fontWeight="bold" color="warmGray.50">
                {name}
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="warmGray.50">
                {formatter(totalAmount, currency)}
              </Text>
            </VStack>

            <Icon size="sm" as={<AntDesign name="right" />} color="white" />
          </HStack>
        </Box>
      </PresenceTransition>
    </TouchableOpacity>
  );
}
