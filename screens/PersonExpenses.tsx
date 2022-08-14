import React, { useState } from "react";
import { Text, Icon, HStack, Divider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Layout from "@components/Box/Layout";
import PaymentInfo from "@components/Box/PersonExpensesBox";
import DeleteExpenseButton from "@components/Buttons/DeleteExpenseButton";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PersonExpenses() {
  const navigation = useNavigation();
  const route = useRoute();
  //@ts-ignore
  const { personName, expenses } = route.params;
  navigation.setOptions({
    headerTitle: personName,
  });
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  return (
    <Layout>
      {expenses.map((payment: { description: string; amount: number }) => (
        <HStack alignItems="center" justifyContent="space-between">
          <PaymentInfo
            onPress={() => setShowDeleteButton(!showDeleteButton)}
            description={payment.description}
            amount={payment.amount}
            showDeleteButton={showDeleteButton}
            key={payment.description}
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
