import React, { useContext, useState, useEffect } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { Text, Box, VStack } from "native-base";
import Layout from "@components/Box/Layout";
import { ImageBackground, ScrollView } from "react-native";
import FinalReportHeader from "@components/Headers/FinalReportHeader";
import BackgroundImage from "@assets/homepage.png";
import ReportChart from "@components/Box/ReportChart";
import formatter from "@utils/formatter";

export default function FinalReport() {
  const { persons, amountPerUser, currency } = useContext(ExpenseContext);
  const [transactions, setTransactions] = useState<
    { name: string; transactions: any[] }[]
  >([]);

  const calculate = () => {
    const personsWhoPayedLess = persons.filter(
      (p) => p.totalAmount < amountPerUser
    );

    const personsWhoPayedMore = persons.filter(
      (p) => p.totalAmount >= amountPerUser
    );

    personsWhoPayedLess.sort((a, b) => Math.abs(a.totalAmount - b.totalAmount));
    personsWhoPayedMore.sort((a, b) => Math.abs(a.totalAmount - b.totalAmount));

    const finalTransactions: { name: string; transactions: any[] }[] = [];

    personsWhoPayedMore.forEach((personWhoPaidMore) => {
      const result = {
        name: personWhoPaidMore.name,
        transactions: [],
      };
      let amountLeft = Math.abs(amountPerUser - personWhoPaidMore.totalAmount);
      while (amountLeft != 0) {
        personsWhoPayedLess.map((personWhoPaidLess) => {
          const debtOfPerson = amountPerUser - personWhoPaidLess.totalAmount;
          if (debtOfPerson <= amountLeft) {
            amountLeft -= debtOfPerson;
            //@ts-ignore
            result.transactions.push({
              [`${personWhoPaidLess.name}`]: debtOfPerson,
            });
            personsWhoPayedLess.filter((p) => p.id != personWhoPaidLess.id);
          } else {
            //@ts-ignore
            result.transactions.push({
              [`${personWhoPaidLess.name}`]: amountLeft,
            });
            personWhoPaidLess.totalAmount -= amountLeft;
            amountLeft = 0;
          }
        });
      }
      finalTransactions.push(result);
    });
    setTransactions(finalTransactions);
  };

  useEffect(() => {
    calculate();
  }, []);

  return (
    <Layout
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
      }}
    >
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={{
          flex: 1,
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingTop: "15%",
          paddingBottom: "15%",
        }}
      >
        <ScrollView>
          <FinalReportHeader />
          <ReportChart />
          <Text mt={2} fontSize="2xl" color="white" fontWeight="bold">
            Who owes who?
          </Text>
          {/* {transactions.map((transaction) => (
            <Box
              bgColor="#F5F6FA"
              py={4}
              px={2}
              borderRadius="2xl"
              borderWidth={1}
              borderColor="#fff"
              shadow={1}
            >
              <VStack>
                <Text color="#777CEF" fontWeight="bold">
                  {transaction.name}
                </Text>
                {transaction.transactions.map((t) => (
                  <Text>{`Will get ${formatter(
                    //@ts-ignore
                    Object.values(t)[0],
                    currency
                  )} from ${Object.keys(t)[0]}`}</Text>
                ))}
              </VStack>
            </Box>
          ))} */}
        </ScrollView>
      </ImageBackground>
    </Layout>
  );
}
