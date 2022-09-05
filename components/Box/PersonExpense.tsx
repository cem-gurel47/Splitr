import React, { useState } from "react";
import PersonExpensesBox from "./PersonExpensesBox";
import { HStack } from "native-base";
import DeleteExpenseButton from "@components/Buttons/DeleteExpenseButton";
import { Expense } from "@models/expense";

const PersonExpense = ({
  expense,
  personId,
  index,
}: {
  expense: Expense;
  personId: number;
  index: number;
}) => {
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);

  return (
    <HStack alignItems="center" justifyContent="space-between" px={4} mb={2}>
      <PersonExpensesBox
        onPress={() => setDeleteButtonVisible(!deleteButtonVisible)}
        expense={expense}
        showDeleteButton={deleteButtonVisible}
      />
      {deleteButtonVisible && (
        <DeleteExpenseButton
          expense={expense}
          personId={personId}
          index={index}
        />
      )}
    </HStack>
  );
};

export default PersonExpense;
