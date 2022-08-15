import React, { useState, useEffect, useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { Text, HStack, Divider } from "native-base";
import Layout from "@components/Box/Layout";
import PersonExpensesBox from "@components/Box/PersonExpensesBox";
import DeleteExpenseButton from "@components/Buttons/DeleteExpenseButton";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Person } from "@models/person";
import formatter from "@utils/formatter";

export default function PersonExpenses() {
  const navigation = useNavigation();
  const route: RouteProp<{
    params: Person;
  }> = useRoute();
  const { name, expenses, totalAmount } = route.params;
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const { currency } = useContext(ExpenseContext);
  const formattedTotalAmount = formatter(totalAmount, currency);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
    });
  }, []);

  return (
    <Layout>
      {expenses.map((expense) => (
        <HStack alignItems="center" justifyContent="space-between">
          <PersonExpensesBox
            onPress={() => setShowDeleteButton(!showDeleteButton)}
            expense={expense}
            showDeleteButton={showDeleteButton}
            key={expense.description}
          />
          {showDeleteButton && <DeleteExpenseButton />}
        </HStack>
      ))}
      <Divider marginTop={2} marginBottom={1} backgroundColor="black" />
      <HStack justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Total:
        </Text>
        <HStack alignItems="center">
          <Text fontSize="xl" fontWeight="bold">
            {formattedTotalAmount}
          </Text>
        </HStack>
      </HStack>
    </Layout>
  );
}
