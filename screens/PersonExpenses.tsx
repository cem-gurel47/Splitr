import React, { useState } from "react";
import { Text, Icon, HStack, Divider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Layout from "@components/Box/Layout";
import PaymentInfo from "@components/Box/PersonExpensesBox";
import DeleteExpenseButton from "@components/Buttons/DeleteExpenseButton";
import { useNavigation, useRoute } from "@react-navigation/native";

const PAYMENT_DATA = [
  {
    description: "Kira",
    amount: 1500.25,
  },
  {
    description: "Su Faturasi",
    amount: 45.75,
  },
  {
    description: "Dogalgaz Faturasi",
    amount: 65.25,
  },
];

export default function PersonExpenses() {
  const navigation = useNavigation();
  const route = useRoute();
  //@ts-ignore
  const { personName } = route.params;
  navigation.setOptions({
    headerTitle: personName,
  });
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  return (
    <Layout>
      {PAYMENT_DATA.map((payment) => (
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
            {PAYMENT_DATA.reduce((acc, payment) => acc + payment.amount, 0)}
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
