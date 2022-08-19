import React, { useContext, useEffect, useMemo, useState } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { HStack, Text, Icon, Divider, Box, Spinner, Center } from "native-base";
import Layout from "@components/Box/Layout";
import { Ionicons } from "@expo/vector-icons";
import formatter from "@utils/formatter";

const ReportInfo = ({
  color,
  description,
  amount,
  icon,
}: {
  color: string;
  description: string;
  amount: number;
  icon: string | React.ReactNode;
}) => {
  const { currency } = useContext(ExpenseContext);

  return (
    <HStack
      bgColor={color}
      alignItems="center"
      p={2}
      borderRadius="lg"
      marginBottom={2}
      justifyContent="space-between"
    >
      <Text fontSize="lg" fontWeight="medium">
        {description}
      </Text>
      <HStack space={1} alignItems="center">
        {typeof icon === "string" ? (
          <Text fontSize="lg">{formatter(amount, currency)}</Text>
        ) : (
          <>
            <Text fontSize="lg">{amount}</Text>
            {icon}
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default function FinalReport() {
  const { persons } = useContext(ExpenseContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => {
      setLoading(true);
    };
  }, []);

  const expenseTotal = useMemo(() => {
    return persons.reduce((acc, person) => {
      return acc + person.totalAmount;
    }, 0);
  }, [persons]);
  const amountPerUser = useMemo(() => {
    return expenseTotal / persons.length;
  }, [expenseTotal, persons]);

  if (loading) {
    return (
      <Layout>
        <Center flex={1}>
          <Spinner color="indigo.500" size="lg" />
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <ReportInfo
        description="Total amount:"
        amount={expenseTotal}
        color="green.400"
        icon="money-icon"
      />
      <ReportInfo
        description="Number of users:"
        amount={persons.length}
        color="red.400"
        icon={
          <Icon
            as={Ionicons}
            name="person-outline"
            color="black"
            size="sm"
            marginLeft={1}
            fontWeight="light"
          />
        }
      />
      <Divider backgroundColor="black" marginBottom={2} />
      <ReportInfo
        description="Amount per user:"
        amount={amountPerUser}
        color="blue.400"
        icon="money-icon"
      />
      <Box borderRadius="lg" backgroundColor="orange.400" w="full" p={2}>
        <Text fontWeight="bold" fontSize="lg" marginTop={2}>
          People who paid more than average:
        </Text>
        <Text fontSize="lg">-John Doe paid +50 USD</Text>
        <Divider backgroundColor="black" marginTop={2} />

        <Text fontWeight="bold" fontSize="lg" marginTop={2}>
          People who paid less than average:
        </Text>
        <Text fontSize="lg">-Jane Doe paid -50 USD</Text>
      </Box>
      <Box borderRadius="lg" backgroundColor="coolGray.400" p={2} marginTop={2}>
        <Text fontWeight="bold" fontSize="lg" marginTop={2}>
          Who pays who?
        </Text>
        <Text fontSize="lg">-Jane Doe pays John Doe 50 USD</Text>
      </Box>
    </Layout>
  );
}
