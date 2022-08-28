import React, { useState, useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import Layout from "@components/Box/Layout";
import { ImageBackground } from "react-native";
import { Select, Center, Text, CheckCircleIcon } from "native-base";
import CurrencyPageBackground from "@assets/currency-page.png";
import BackgroundButton from "@components/Buttons/BackgroundButton";
import { useNavigation } from "@react-navigation/native";

const CURRENCY_OPTIONS = ["USD", "EUR", "CAD", "TRY", "JPY", "CNY"];

const SelectCurrency = () => {
  const navigation = useNavigation();
  const { setDbCurrency } = useContext(ExpenseContext);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY_OPTIONS[0]);

  const onPress = () => {
    setDbCurrency(selectedCurrency);
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
        source={CurrencyPageBackground}
        style={{
          flex: 1,
          padding: "5%",
          paddingTop: "20%",
          position: "relative",
        }}
      >
        <Text fontSize="2xl" color="white" fontWeight="thin">
          Let's select a
        </Text>
        <Text fontSize="3xl" color="white" fontWeight="bold">
          Currency
        </Text>
        <Center position="absolute" top="50%" alignSelf="center" w="100%">
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
          <BackgroundButton onPress={onPress}>Continue</BackgroundButton>
        </Center>
      </ImageBackground>
    </Layout>
  );
};

export default SelectCurrency;
