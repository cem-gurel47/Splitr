import React, { useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import {
  Box,
  Text,
  Pressable,
  PresenceTransition,
  Icon,
  VStack,
  HStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Person } from "@models/person";
import { AntDesign } from "@expo/vector-icons";
import formatter from "@utils/formatter";

const BG_COLORS = ["#777DEF", "#44BAF8", "#F1727D", "#F9BA55"];

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
    <Pressable
      onPress={() => navigation.navigate("Person Expenses", person)}
      w="49%"
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
        <Box mb={5} bgColor={BG_COLORS[index % 4]} px={4} py={6} rounded="3xl">
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
    </Pressable>
  );
}
