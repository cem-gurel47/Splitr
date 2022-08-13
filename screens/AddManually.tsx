import React, { useState } from "react";
import {
  Text,
  Icon,
  HStack,
  Divider,
  IconButton,
  PresenceTransition,
} from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Layout from "@components/Box/Layout";

const PAYMENT_DATA = [
  {
    description: "Kira",
    amount: 1500.25,
  },
  {
    description: "Su Faturasi",
    amount: 45.75,
  },
  {
    description: "Dogalgaz Faturasi",
    amount: 65.25,
  },
];

export default function ScanBarcode() {
  const [showEditButton, setShowEditButton] = useState(false);

  const PaymentInfo = ({ description, amount }) => {
    return (
      <HStack
        justifyContent="space-between"
        backgroundColor="yellow.400"
        p={2}
        mb={2}
        borderRadius="md"
        width={showEditButton ? "90%" : "full"}
      >
        <Text fontSize="xl" color="black">
          {description}
        </Text>
        <HStack alignItems="center">
          <Text fontSize="xl" color="black">
            {amount}
          </Text>
          <Icon
            as={MaterialIcons}
            size="6"
            name="attach-money"
            _dark={{
              color: "warmGray.50",
            }}
            color="black"
          />
        </HStack>
      </HStack>
    );
  };

  return (
    <Layout>
      {PAYMENT_DATA.map((payment) => (
        <HStack alignItems="center" justifyContent="space-between">
          <PaymentInfo
            description={payment.description}
            amount={payment.amount}
            key={payment.description}
          />
          {showEditButton && (
            <PresenceTransition
              visible={showEditButton}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 250,
                },
              }}
            >
              <IconButton
                variant="solid"
                bg="transparent"
                colorScheme="red"
                borderRadius="full"
                icon={
                  <Icon
                    as={Ionicons}
                    size="2xl"
                    name="md-remove-circle-sharp"
                    _dark={{
                      color: "white",
                    }}
                    color="red.500"
                  />
                }
              />
            </PresenceTransition>
          )}
        </HStack>
      ))}
      <Divider marginTop={2} marginBottom={1} backgroundColor="black" />
      <HStack justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Total:
        </Text>
        <HStack alignItems="center">
          <Text fontSize="xl" fontWeight="bold">
            {PAYMENT_DATA.reduce((acc, payment) => acc + payment.amount, 0)}
          </Text>
          <Icon
            as={MaterialIcons}
            size="6"
            name="attach-money"
            _dark={{
              color: "warmGray.50",
            }}
            color="black"
          />
        </HStack>
      </HStack>
    </Layout>
  );
}
