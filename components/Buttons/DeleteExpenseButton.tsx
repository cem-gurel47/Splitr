import React, { useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { PresenceTransition, IconButton, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Expense } from "@models/expense";
import Toast from "react-native-toast-message";
import formatter from "@utils/formatter";

const DeleteExpenseButton = ({
  expense,
  personId,
}: {
  expense: Expense;
  personId: number;
}) => {
  const { deleteExpense, currency } = useContext(ExpenseContext);
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
          Toast.show({
            type: "success",
            text1: `${expense.description} is deleted!`,
            text2: `${formatter(
              expense.amount,
              currency
            )} is removed from the expenses`,
          });
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
