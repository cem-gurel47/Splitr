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
      <Box p={2} mx={3} bgColor="transparent" mb={2}>
        <HStack justifyContent="space-between">
          <Text fontSize="xl" color="#777CEF">
            {description}
          </Text>
          <HStack alignItems="center" space={1}>
            <Text fontSize="xl" color="#777CEF" fontWeight="bold">
              {formattedAmount}
            </Text>
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default PersonExpensesBox;
