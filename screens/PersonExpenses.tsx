import React, { useEffect, useContext } from "react";
import { FlatList } from "react-native";
import { ExpenseContext } from "@contexts/ExpenseContext";
import {
  Text,
  HStack,
  Center,
  Icon,
  IconButton,
  Button,
  Container,
} from "native-base";
import Layout from "@components/Box/Layout";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Person } from "@models/person";
import AnimatedLottieView from "lottie-react-native";
import ScanningAnimation from "../assets/scanning.json";
import PersonExpensesHeader from "@components/Headers/PersonExpensesHeader";
import PersonExpense from "@components/Box/PersonExpense";
import AddExpenseStagger from "@components/Stagger/AddExpenseStagger";

const NoData = ({ id, name }: { id: number; name: string }) => {
  const navigation = useNavigation();

  return (
    <>
      <PersonExpensesHeader name={name} id={id} />
      <Center style={{ flex: 1 }} position="relative">
        <Text color="black" fontSize="2xl">
          No expense found.
        </Text>
        <Center width="sm" height="sm">
          <AnimatedLottieView
            source={ScanningAnimation}
            autoPlay
            loop
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Center>
        <AddExpenseStagger id={id} />
      </Center>
    </>
  );
};

export default function PersonExpenses() {
  const navigation = useNavigation();
  const route: RouteProp<{
    params: Person;
  }> = useRoute();
  const { name, id } = route.params;
  const { persons } = useContext(ExpenseContext);
  const person = persons.find((person) => person.id === id);
  const expenses = person?.expenses ?? [];

  useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
    });
  }, []);

  return (
    <Layout
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        position: "relative",
      }}
    >
      {expenses.length === 0 ? (
        <NoData id={id} name={name} />
      ) : (
        <>
          <FlatList
            style={{ flexGrow: 0 }}
            data={expenses}
            renderItem={({ item, index }) => (
              <PersonExpense
                personId={id}
                expense={item}
                index={index}
                key={`${item.description}-${index}`}
              />
            )}
            ListHeaderComponent={() => (
              <PersonExpensesHeader name={name} id={id} />
            )}
            keyExtractor={(item, index) => `${item.description}-${index}`}
          />
          <AddExpenseStagger id={id} />
        </>
      )}
    </Layout>
  );
}
