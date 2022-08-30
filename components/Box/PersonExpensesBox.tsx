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
      width={showDeleteButton ? "90%" : "100%"}
      onPress={() => {
        onPress();
      }}
    >
      <Box
        p={2}
        px={4}
        bgColor="#F5F6FA"
        mb={2}
        // borderColor="#777CEF"
        // borderWidth={1}
        borderRadius="3xl"
      >
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="md" color="#777CEF" numberOfLines={1} maxW="70%">
            {description}
          </Text>
          <HStack alignItems="center" space={1}>
            <Text fontSize="lg" color="#777CEF" fontWeight="bold">
              {formattedAmount}
            </Text>
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default PersonExpensesBox;
