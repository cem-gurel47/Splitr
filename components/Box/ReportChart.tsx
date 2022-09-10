import React, { useContext, useState, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { Text, Box, HStack, VStack, Icon } from "native-base";
import formatter from "@utils/formatter";
import { BG_COLORS } from "@utils/constants";
import { Feather } from "@expo/vector-icons";
import CardFlip from "react-native-card-flip";

const ReportChart = () => {
  const [card, setCard] = useState<CardFlip | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const { persons, currency, amountPerUser, totalAmount } =
    useContext(ExpenseContext);
  const [height, setHeight] = useState(220);

  const personsWhoPayedLess = persons.filter(
    (person) => person.totalAmount < amountPerUser
  );

  const personsWhoPayedMore = persons.filter(
    (person) => person.totalAmount >= amountPerUser
  );

  const maxHeight = 32;

  return (
    <Box
      borderRadius="3xl"
      bgColor="white"
      _dark={{
        bgColor: "#24242D",
      }}
      p={6}
    >
      <HStack justifyContent="space-between" alignItems="center" mb={4}>
        <VStack>
          <Text mb={1} fontSize="md">
            Your total balance
          </Text>
          <Text color="#43BAF8" fontSize="2xl" fontWeight="bold">
            {formatter(totalAmount, currency)}
          </Text>
        </VStack>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            card?.flip({
              duration: 300,
              direction: "left",
            });
            setIsFlipped(!isFlipped);
          }}
        >
          <Icon
            as={Feather}
            name="rotate-ccw"
            size="xl"
            color="#43BAF8"
            _dark={{
              color: "#fff",
            }}
          />
        </TouchableOpacity>
      </HStack>

      <CardFlip
        ref={(card) => setCard(card)}
        style={{
          height: height + 10,
        }}
      >
        <VStack
          justifyContent="space-between"
          onLayout={(event) => {
            setHeight(event.nativeEvent.layout.height);
          }}
        >
          <HStack space={8}>
            {personsWhoPayedMore.map((p, index) => (
              <Box
                key={`${p.id} -${index}`}
                bgColor={BG_COLORS[p.id % BG_COLORS.length]}
                borderTopLeftRadius="xl"
                borderTopRightRadius="xl"
                w={6}
                // the max height of bar is 32, so we need to calculate the height of the bar
                // based on the amount of money that person payed
                h={Math.min(
                  (p.totalAmount / amountPerUser) * maxHeight,
                  maxHeight
                )}
              />
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
                height={Math.min(
                  maxHeight,
                  (amountPerUser - p.totalAmount) / 20
                )}
              />
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
                />
                <Text>{p.name}</Text>
              </HStack>
            ))}
          </HStack>
        </VStack>
        <VStack justifyContent="space-between">
          <Text fontSize="md">Amount Per Person:</Text>
          <Text color="green.400" fontSize="2xl" fontWeight="bold">
            {formatter(amountPerUser, currency)}
          </Text>
        </VStack>
      </CardFlip>
    </Box>
  );
};

export default ReportChart;
