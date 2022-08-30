import React, { useContext, useState } from "react";
import { RefreshControl, FlatList, ImageBackground } from "react-native";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { useDisclose, Text, Center, Spinner, VStack } from "native-base";
import Layout from "@components/Box/Layout";
import PersonBox from "@components/Box/PersonBox";
import { HomeEmptyStagger, HomeStagger } from "@components/Stagger";
import HomeHeader from "@components/Headers/HomeHeader";
import CalculateBackgroundBox from "@components/Box/CalculateBackgroundBox";
import WelcomePage from "@assets/welcome-page.png";
import LoadingAnimation from "@assets/loading.json";
import AnimatedLottieView from "lottie-react-native";

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
          <AnimatedLottieView
            source={LoadingAnimation}
            autoPlay
            loop
            style={{
              width: "40%",
              height: "100%",
            }}
          />
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
            ListHeaderComponent={() => <HomeHeader />}
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
