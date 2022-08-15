import React, { useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { Box, HStack, Text, Pressable, PresenceTransition } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Person } from "@models/person";
import formatter from "@utils/formatter";

export default function PersonBox({ person }: { person: Person }) {
  const navigation = useNavigation();
  const { currency } = useContext(ExpenseContext);
  const { name, totalAmount } = person;

  return (
    <Pressable onPress={() => navigation.navigate("Person Expenses", person)}>
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
          _light={{
            bg: {
              linearGradient: {
                colors: ["#ff4e50", "#f9d423"],
                start: [0, 0],
                end: [1, 1],
              },
            },
          }}
          _dark={{
            bg: {
              linearGradient: {
                colors: ["#70e1f5", "#ffd194"],
                start: [0, 0],
                end: [1, 1],
              },
            },
          }}
          p="12"
          rounded="xl"
        >
          <HStack alignItems="center" justifyContent="center" space={2}>
            <Text fontSize="2xl" fontWeight="bold" color="warmGray.50">
              {name}
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="center" space={2}>
            <Text fontSize="2xl" fontWeight="bold" color="warmGray.50">
              {formatter(totalAmount, currency)}
            </Text>
          </HStack>
        </Box>
      </PresenceTransition>
    </Pressable>
  );
}
