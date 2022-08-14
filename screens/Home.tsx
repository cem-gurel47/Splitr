import React, { useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { useDisclose, Text, Center, ScrollView } from "native-base";
import Layout from "@components/Box/Layout";
import PersonBox from "@components/Box/PersonBox";
import { HomeEmptyStagger, HomeStagger } from "@components/Stagger";

export default function Home() {
  const { isOpen, onToggle } = useDisclose();
  const { expenses, loading } = useContext(ExpenseContext);

  if (loading) {
    return (
      <Layout>
        <Center>
          <Text>Loading...</Text>
        </Center>
      </Layout>
    );
  }

  if (expenses.length === 0) {
    return (
      <Layout>
        <Center backgroundColor="blueGray.300" flex={1}>
          <Text fontSize="4xl">Welcome to GermanStyla</Text>
        </Center>
        <HomeEmptyStagger />
      </Layout>
    );
  }

  return (
    <Layout
      style={{
        position: "relative",
      }}
      onPress={() => {
        if (isOpen) {
          onToggle();
        }
      }}
    >
      <ScrollView>
        {expenses.map((person) => (
          <PersonBox
            name={person.name}
            amount={person.totalAmount}
            currency="USD"
            expenses={person.expenses}
            key={person.id}
          />
        ))}
      </ScrollView>
      <HomeStagger isOpen={isOpen} onToggle={onToggle} />
    </Layout>
  );
}
