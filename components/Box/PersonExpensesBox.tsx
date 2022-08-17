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
      <Box
        width="full"
        backgroundColor="blue.400"
        p={2}
        mb={2}
        borderRadius="md"
        // bg={{
        //   linearGradient: {
        //     colors: ["blue.300", "gray.200"],
        //     start: [0, 0],
        //     end: [1, 1],
        //   },
        // }}
      >
        <HStack justifyContent="space-between">
          <Text fontSize="xl" color="white">
            {description}
          </Text>
          <HStack alignItems="center" space={1}>
            <Text fontSize="xl" color="white" fontWeight="bold">
              {formattedAmount}
            </Text>
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default PersonExpensesBox;
