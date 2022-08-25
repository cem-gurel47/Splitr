import React, { useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { PresenceTransition, IconButton, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Expense } from "@models/expense";

const DeleteExpenseButton = ({
  expense,
  personId,
}: {
  expense: Expense;
  personId: number;
}) => {
  const { deleteExpense } = useContext(ExpenseContext);
  return (
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
      <IconButton
        variant="solid"
        bg="transparent"
        colorScheme="red"
        borderRadius="full"
        onPress={() => {
          deleteExpense(expense.description, expense.amount, personId);
        }}
        icon={
          <Icon
            as={Ionicons}
            size="2xl"
            name="md-remove-circle-sharp"
            _dark={{
              color: "white",
            }}
            color="red.500"
          />
        }
      />
    </PresenceTransition>
  );
};

export default DeleteExpenseButton;
