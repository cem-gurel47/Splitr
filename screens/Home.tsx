import React from "react";
import { useDisclose, Text, Center } from "native-base";
import Layout from "@components/Box/Layout";
import PersonBox from "@components/Box/PersonBox";
import { HomeEmptyStagger, HomeStagger } from "@components/Stagger";
import { useNavigation } from "@react-navigation/native";

const PERSON_DATA = [
  {
    id: 1,
    name: "John Doe",
    amount: 100,
    currency: "USD",
  },
  {
    id: 2,
    name: "Jane Doe",
    amount: 200,
    currency: "USD",
  },
];

type NavigationProps = {
  navigate: (name: string) => void;
};

export default function Home() {
  const { isOpen, onToggle } = useDisclose();
  const navigation = useNavigation<NavigationProps>();

  if (PERSON_DATA.length === 0) {
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
      {PERSON_DATA.map((person) => (
        <PersonBox
          name={person.name}
          amount={person.amount}
          currency="USD"
          key={person.id}
        />
      ))}
      <HomeStagger isOpen={isOpen} onToggle={onToggle} />
    </Layout>
  );
}
