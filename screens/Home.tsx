import React, { useContext, useState } from "react";
import { RefreshControl, FlatList, ImageBackground } from "react-native";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { ThemeContext } from "@contexts/ThemeContext";
import { useDisclose, Text, Center } from "native-base";
import Layout from "@components/Box/Layout";
import PersonBox from "@components/Box/PersonBox";
import { HomeEmptyStagger } from "@components/Stagger";
import HomeHeader from "@components/Headers/HomeHeader";
import WelcomePage from "@assets/welcome-page.png";
import WelcomePageDark from "@assets/welcome-dark.png";
import LoadingAnimation from "@assets/loading.json";
import AnimatedLottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const { isOpen, onToggle } = useDisclose();
  const { persons, getExpenses, loading, currency } =
    useContext(ExpenseContext);
  const { theme, themeLoading } = useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);

  if (!loading && !themeLoading && !currency) {
    // then the currency is not set, so go to the select currency screen
    navigation.navigate("Select Currency");
  }

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
      {loading || themeLoading ? (
        <Center
          flex={1}
          _dark={{
            bgColor: "#24242D",
          }}
        >
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
          source={theme === "dark" ? WelcomePageDark : WelcomePage}
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
            stickyHeaderIndices={[0]}
            keyExtractor={(item) => `${item.id}`}
            ListHeaderComponent={() => <HomeHeader />}
            ListFooterComponentStyle={{
              paddingLeft: 25,
              paddingRight: 25,
            }}
            // ListFooterComponent={() => <CalculateBackgroundBox />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  getExpenses();
                  setRefreshing(false);
                }}
              />
            }
          />
          {/* <HomeStagger isOpen={isOpen} onToggle={onToggle} /> */}
        </>
      )}
    </Layout>
  );
}
