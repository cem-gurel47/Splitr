import React from "react";
import { HStack, Text, Icon, Box, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Expense } from "@models/expense";

type Props = {
  expense: Expense;
  showDeleteButton: boolean;
  onPress: () => void;
};

const PersonExpensesBox = ({ expense, showDeleteButton, onPress }: Props) => {
  const { description, amount } = expense;
  return (
    <Pressable
      onLongPress={onPress}
      width={showDeleteButton ? "90%" : "full"}
      onPress={() => {
        onPress();
      }}
    >
      <Box width="full">
        <HStack
          justifyContent="space-between"
          backgroundColor="yellow.400"
          p={2}
          mb={2}
          borderRadius="md"
        >
          <Text fontSize="xl" color="black">
            {description}
          </Text>
          <HStack alignItems="center">
            <Text fontSize="xl" color="black">
              {amount}
            </Text>
            <Icon
              as={MaterialIcons}
              size="6"
              name="attach-money"
              _dark={{
                color: "warmGray.50",
              }}
              color="black"
            />
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default PersonExpensesBox;
