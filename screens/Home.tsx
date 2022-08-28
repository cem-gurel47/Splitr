import React, { useContext, useState } from "react";
import { RefreshControl, FlatList, ImageBackground } from "react-native";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { useDisclose, Text, Center, Spinner, VStack } from "native-base";
import Layout from "@components/Box/Layout";
import PersonBox from "@components/Box/PersonBox";
import { HomeEmptyStagger, HomeStagger } from "@components/Stagger";
import formatter from "@utils/formatter";
import CalculateBackgroundBox from "@components/Box/CalculateBackgroundBox";
import WelcomePage from "@assets/welcome-page.png";

export default function Home() {
  const { isOpen, onToggle } = useDisclose();
  const { persons, getExpenses, currency, totalAmount, loading } =
    useContext(ExpenseContext);
  const [refreshing, setRefreshing] = useState(false);

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
        <ImageBackground
          source={WelcomePage}
          style={{
            flex: 1,
            padding: "5%",
            paddingTop: "20%",
          }}
        >
          <Text fontSize="2xl" color="white" fontWeight="thin">
            Let's add a new
          </Text>
          <Text fontSize="3xl" color="white" fontWeight="bold">
            Person
          </Text>

          <HomeEmptyStagger />
        </ImageBackground>
      ) : (
        <>
          <FlatList
            numColumns={2}
            data={persons}
            columnWrapperStyle={{
              paddingLeft: 25,
              paddingRight: 25,
              justifyContent: "space-between",
            }}
            renderItem={({ item, index }) => (
              <PersonBox person={item} index={index} />
            )}
            stickyHeaderIndices={[1]}
            keyExtractor={(item) => `${item.id}`}
            ListHeaderComponent={() => (
              <VStack>
                <Center
                  style={{
                    backgroundColor: "#787DE8",
                  }}
                  borderBottomLeftRadius={60}
                  borderBottomRightRadius={60}
                  pt={16}
                  pb={8}
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
                  <Text color="white" fontWeight="extrabold" fontSize="xl">
                    {formatter(totalAmount, currency)}
                  </Text>
                </Center>
                <Text
                  color="black"
                  fontSize="xl"
                  fontWeight="bold"
                  pl={25}
                  mb={4}
                >
                  Track your expenses
                </Text>
              </VStack>
            )}
            ListFooterComponentStyle={{
              paddingLeft: 25,
              paddingRight: 25,
            }}
            ListFooterComponent={() => <CalculateBackgroundBox />}
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
