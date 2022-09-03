import React, { useState, useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { ThemeContext } from "@contexts/ThemeContext";
import Layout from "@components/Box/Layout";
import { ImageBackground } from "react-native";
import { Select, Center, Text, CheckCircleIcon } from "native-base";
import CurrencyPageBackground from "@assets/currency-page.png";
import CurrencyPageBackgroundDark from "@assets/currency-page-dark.png";
import BackgroundButton from "@components/Buttons/BackgroundButton";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const CURRENCY_OPTIONS = ["USD", "EUR", "CAD", "TRY", "JPY", "CNY", "GBP"];

const SelectCurrency = () => {
  const navigation = useNavigation();
  const { setDbCurrency, currency, updateCurrency } =
    useContext(ExpenseContext);
  const { theme } = useContext(ThemeContext);
  const [selectedCurrency, setSelectedCurrency] = useState(
    currency || CURRENCY_OPTIONS[0]
  );

  const onPress = () => {
    if (currency) {
      updateCurrency(selectedCurrency);
      Toast.show({
        type: "success",
        text1: "Currency updated",
        text2: "Your currency has been updated to " + selectedCurrency,
      });
    } else {
      setDbCurrency(selectedCurrency);
    }

    navigation.navigate("Home");
  };

  return (
    <Layout
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
      }}
    >
      <ImageBackground
        source={
          theme === "dark" ? CurrencyPageBackgroundDark : CurrencyPageBackground
        }
        style={{
          flex: 1,
          padding: "5%",
          paddingTop: "10%",
          position: "relative",
        }}
      >
        {currency ? (
          <>
            <Text fontSize="2xl" color="white" fontWeight="thin">
              Update
            </Text>
            <Text fontSize="3xl" color="white" fontWeight="bold">
              Currency
            </Text>
          </>
        ) : (
          <>
            <Text fontSize="2xl" color="white" fontWeight="thin">
              Let's select a
            </Text>
            <Text fontSize="3xl" color="white" fontWeight="bold">
              Currency
            </Text>
          </>
        )}
        <Center position="absolute" bottom="10%" alignSelf="center" w="100%">
          <Select
            w="100%"
            mb="35%"
            borderWidth={0}
            style={{
              borderBottomColor: "#9196F3",
              borderBottomWidth: 1,
            }}
            textDecorationColor="danger.500"
            selectedValue={selectedCurrency}
            nativeID="currency"
            size="xl"
            variant="unstyled"
            _selectedItem={{
              bg: "transparent",
              endIcon: <CheckCircleIcon size="5" />,
            }}
            onValueChange={(value) => {
              setSelectedCurrency(value);
            }}
          >
            {CURRENCY_OPTIONS.map((value) => (
              <Select.Item value={value} label={value} key={value} />
            ))}
          </Select>
          <BackgroundButton onPress={onPress}>
            {currency ? "Update" : "Continue"}
          </BackgroundButton>
        </Center>
      </ImageBackground>
    </Layout>
  );
};

export default SelectCurrency;
