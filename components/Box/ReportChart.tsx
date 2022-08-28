import React, { useContext, useMemo } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { Text, Box, HStack, VStack, Divider } from "native-base";
import formatter from "@utils/formatter";
import { BG_COLORS } from "@utils/constants";

const ReportChart = () => {
  const { persons, currency, amountPerUser, totalAmount } =
    useContext(ExpenseContext);

  const personsWhoPayedLess = persons.filter(
    (person) => person.totalAmount < amountPerUser
  );

  const personsWhoPayedMore = persons.filter(
    (person) => person.totalAmount >= amountPerUser
  );

  const maxHeight = 32;

  return (
    <Box borderRadius="xl" bgColor="white" p={6}>
      <Text mb={1}>Your total balance</Text>
      <Text color="#43BAF8" fontSize="2xl" fontWeight="bold" mb={4}>
        {formatter(totalAmount, currency)}
      </Text>
      <VStack justifyContent="space-between">
        <HStack space={8}>
          {personsWhoPayedMore.map((p, index) => (
            <Box
              key={`${p.id} -${index}`}
              bgColor={BG_COLORS[p.id % BG_COLORS.length]}
              borderTopLeftRadius="xl"
              borderTopRightRadius="xl"
              w={6}
              height={Math.min(
                maxHeight,
                Math.abs(amountPerUser - p.totalAmount) / 5
              )}
            ></Box>
          ))}
        </HStack>

        <HStack space={4} pl={6}>
          {personsWhoPayedLess.map((p, index) => (
            <Box
              key={`${p.id}-${index}`}
              bgColor={BG_COLORS[p.id % BG_COLORS.length]}
              borderBottomLeftRadius="xl"
              borderBottomRightRadius="xl"
              w={6}
              height={Math.min(maxHeight, (amountPerUser - p.totalAmount) / 30)}
            ></Box>
          ))}
        </HStack>
        <HStack space={2} mt={4} flexWrap="wrap">
          {persons.map((p) => (
            <HStack alignItems="center" space={2} key={p.id}>
              <Box
                borderRadius="full"
                bgColor={BG_COLORS[p.id % BG_COLORS.length]}
                w={4}
                h={4}
              ></Box>
              <Text>{p.name}</Text>
            </HStack>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

export default ReportChart;
