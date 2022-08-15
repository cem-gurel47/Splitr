import React, { useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { HStack, Text, Icon, Box, Pressable } from "native-base";
import { Expense } from "@models/expense";
import formatter from "@utils/formatter";

type Props = {
  expense: Expense;
  showDeleteButton: boolean;
  onPress: () => void;
};

const PersonExpensesBox = ({ expense, showDeleteButton, onPress }: Props) => {
  const { description, amount } = expense;
  const { currency } = useContext(ExpenseContext);
  const formattedAmount = formatter(amount, currency);
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
          <HStack alignItems="center" space={1}>
            <Text fontSize="xl" color="black">
              {formattedAmount}
            </Text>
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default PersonExpensesBox;
