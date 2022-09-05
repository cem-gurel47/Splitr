import React, { useContext, useState, useEffect } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { Text, Box, VStack, Avatar, HStack, Button } from "native-base";
import Layout from "@components/Box/Layout";
import { ImageBackground, ScrollView, StatusBar } from "react-native";
import FinalReportHeader from "@components/Headers/FinalReportHeader";
import BackgroundImage from "@assets/homepage.png";
import ReportChart from "@components/Box/ReportChart";
import formatter from "@utils/formatter";
import { BG_COLORS } from "@utils/constants";

export default function FinalReport() {
  const totalAmount = 0;
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
        }}
      >
        <StatusBar backgroundColor="#43BAF8" />
        <FinalReportHeader />

        <ScrollView>
          <ReportChart />
          <Text mt={2} mb={2} fontSize="2xl" color="white" fontWeight="bold">
            Who owes who?
          </Text>
          <VStack space={2} paddingBottom={10}>
            {transactions.map((transaction, i) => {
              return transaction.transactions.map((t, j) => {
                const personWhoNeedsToPay = Object.keys(t)[0];
                const avatarName =
                  personWhoNeedsToPay.length < 2
                    ? personWhoNeedsToPay
                    : personWhoNeedsToPay.substring(0, 2);
                const personColor = BG_COLORS[j % BG_COLORS.length];
                const personWhoNeedsToGetPaid = transaction.name;
                return (
                  <Box
                    key={`box-${i}-${j}`}
                    bgColor="white"
                    borderRadius="3xl"
                    justifyContent="space-between"
                    alignItems="center"
                    flexDirection="row"
                    pr={4}
                  >
                    <HStack space={2}>
                      <Avatar
                        size="md"
                        bgColor={personColor}
                        borderWidth={1}
                        borderColor="white"
                      >
                        {avatarName}
                      </Avatar>
                      <VStack>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color={personColor}
                        >
                          {personWhoNeedsToPay}
                        </Text>
                        <Text fontSize="sm" color="coolGray.500">
                          {`${personWhoNeedsToPay} owes ${personWhoNeedsToGetPaid}`}
                        </Text>
                      </VStack>
                    </HStack>
                    <Text fontSize="sm" fontWeight="bold" color="#787DE8">
                      {formatter(t[personWhoNeedsToPay], currency)}
                    </Text>
                  </Box>
                );
              });
            })}
          </VStack>
        </ScrollView>
      </ImageBackground>
    </Layout>
  );
}
