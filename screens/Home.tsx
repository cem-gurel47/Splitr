import React, { useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { useDisclose, Text, Center, ScrollView, Spinner } from "native-base";
import Layout from "@components/Box/Layout";
import PersonBox from "@components/Box/PersonBox";
import { HomeEmptyStagger, HomeStagger } from "@components/Stagger";

export default function Home() {
  const { isOpen, onToggle } = useDisclose();
  const { persons, loading } = useContext(ExpenseContext);

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
          <ScrollView>
            {persons.map((person) => (
              <PersonBox person={person} key={person.id} />
            ))}
          </ScrollView>
          <HomeStagger isOpen={isOpen} onToggle={onToggle} />
        </>
      )}
    </Layout>
  );
}
