import React, { useState } from "react";
import PersonExpensesBox from "./PersonExpensesBox";
import { HStack } from "native-base";
import DeleteExpenseButton from "@components/Buttons/DeleteExpenseButton";
import { Expense } from "@models/expense";

const PersonExpense = ({
  expense,
  personId,
}: {
  expense: Expense;
  personId: number;
}) => {
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);

  return (
    <HStack alignItems="center" justifyContent="space-between" px={4}>
      <PersonExpensesBox
        onPress={() => setDeleteButtonVisible(!deleteButtonVisible)}
        expense={expense}
        showDeleteButton={deleteButtonVisible}
      />
      {deleteButtonVisible && (
        <DeleteExpenseButton expense={expense} personId={personId} />
      )}
    </HStack>
  );
};

export default PersonExpense;
