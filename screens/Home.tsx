import React, { useContext, useState, useMemo } from "react";
import { RefreshControl, FlatList } from "react-native";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { useDisclose, Text, Center, Spinner } from "native-base";
import Layout from "@components/Box/Layout";
import PersonBox from "@components/Box/PersonBox";
import { HomeEmptyStagger, HomeStagger } from "@components/Stagger";
import formatter from "@utils/formatter";

export default function Home() {
  const { isOpen, onToggle } = useDisclose();
  const { persons, loading, getExpenses, currency } =
    useContext(ExpenseContext);
  const [refreshing, setRefreshing] = useState(false);
  const totalExpenses = useMemo(() => {
    return persons.reduce((acc, person) => {
      return (
        acc +
        person.expenses.reduce((acc, expense) => {
          return acc + expense.amount;
        }, 0)
      );
    }, 0);
  }, [persons]);

  return (
    <Layout
      style={{
        position: "relative",
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
      }}
      onPress={() => {
        if (isOpen) {
          onToggle();
        }
      }}
    >
      {loading ? (
        <Center flex={1}>
          <Spinner size="lg" color="indigo.500" />
        </Center>
      ) : persons.length === 0 ? (
        <>
          <Center backgroundColor="blueGray.300" flex={1}>
            <Text fontSize="4xl">Welcome to GermanStyla</Text>
          </Center>
          <HomeEmptyStagger />
        </>
      ) : (
        <>
          <FlatList
            data={persons}
            renderItem={({ item }) => <PersonBox person={item} />}
            stickyHeaderIndices={[0]}
            keyExtractor={(item) => `${item.id}`}
            ListHeaderComponent={() => (
              <Center
                style={{
                  backgroundColor: "#787DE8",
                }}
                borderBottomLeftRadius={60}
                borderBottomRightRadius={60}
                pt={12}
                pb={4}
                px={6}
                mb={4}
              >
                <Text
                  fontSize="xl"
                  mb={1}
                  style={{
                    color: "#98C1F7",
                  }}
                >
                  Your total expenses
                </Text>
                <Text color="white" fontWeight="bold" fontSize="xl">
                  {formatter(totalExpenses, currency)}
                </Text>
              </Center>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  console.log(loading);
                  getExpenses();
                  setRefreshing(false);
                }}
              />
            }
          />
          <HomeStagger isOpen={isOpen} onToggle={onToggle} />
        </>
      )}
    </Layout>
  );
}
