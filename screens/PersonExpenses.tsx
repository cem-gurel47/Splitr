import React, { useState, useEffect } from "react";
import { Text, Icon, HStack, Divider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Layout from "@components/Box/Layout";
import PersonExpensesBox from "@components/Box/PersonExpensesBox";
import DeleteExpenseButton from "@components/Buttons/DeleteExpenseButton";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Person } from "@models/person";

export default function PersonExpenses() {
  const navigation = useNavigation();
  const route: RouteProp<{
    params: Person;
  }> = useRoute();
  const { name, expenses } = route.params;
  const [showDeleteButton, setShowDeleteButton] = useState(false);

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
            {expenses.reduce(
              (
                acc: number,
                payment: {
                  amount: number;
                }
              ) => acc + payment.amount,
              0
            )}
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
    </Layout>
  );
}
