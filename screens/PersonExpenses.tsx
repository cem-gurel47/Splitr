import React, { useState, useEffect, useContext } from "react";
import { FlatList } from "react-native";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { Text, HStack, Divider, Center, Icon, Button } from "native-base";
import Layout from "@components/Box/Layout";
import PersonExpensesBox from "@components/Box/PersonExpensesBox";
import DeleteExpenseButton from "@components/Buttons/DeleteExpenseButton";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Person } from "@models/person";
import formatter from "@utils/formatter";
import AnimatedLottieView from "lottie-react-native";
import ScanningAnimation from "../assets/scanning.json";
import { Ionicons } from "@expo/vector-icons";
import { AddExpenseModal } from "@components/Modals";

const NoData = ({ id }: { id: number }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Center style={{ flex: 1 }}>
      <Text color="black" fontSize="2xl">
        No expense found.
      </Text>
      <Center width="sm" height="sm">
        <AnimatedLottieView
          source={ScanningAnimation}
          autoPlay
          loop
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Center>
      <Button
        variant="solid"
        colorScheme="blue"
        backgroundColor="blue.100"
        borderRadius="full"
        onPress={() => setModalVisible(true)}
        justifyContent="flex-start"
      >
        <HStack alignItems="center" justifyContent="space-between" space={2}>
          <Text color="blue.500" fontSize="lg" fontWeight="semibold">
            Add Expense
          </Text>
          <Icon
            as={Ionicons}
            size="2xl"
            name="ios-add"
            _dark={{
              color: "white",
            }}
            color="blue.500"
          />
        </HStack>
      </Button>

      <AddExpenseModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        personId={id}
      />
    </Center>
  );
};

export default function PersonExpenses() {
  const navigation = useNavigation();
  const route: RouteProp<{
    params: Person;
  }> = useRoute();
  const { name, expenses, totalAmount, id } = route.params;
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { currency } = useContext(ExpenseContext);
  const formattedTotalAmount = formatter(totalAmount, currency);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
    });
  }, []);

  return (
    <Layout>
      {expenses.length === 0 ? (
        <NoData id={id} />
      ) : (
        <>
          <Text mb={3} fontSize="xl" fontWeight="bold">
            Current expenses:
          </Text>
          <FlatList
            style={{ flexGrow: 0 }}
            data={expenses}
            renderItem={({ item }) => (
              <HStack alignItems="center" justifyContent="space-between">
                <PersonExpensesBox
                  onPress={() => setShowDeleteButton(!showDeleteButton)}
                  expense={item}
                  showDeleteButton={showDeleteButton}
                  key={item.description}
                />
                {showDeleteButton && <DeleteExpenseButton />}
              </HStack>
            )}
            keyExtractor={(item) => item.description}
          />
          <Divider marginTop={2} mb={1} backgroundColor="black" />
          <HStack justifyContent="space-between">
            <Text fontSize="xl" fontWeight="bold">
              Total:
            </Text>
            <HStack alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {formattedTotalAmount}
              </Text>
            </HStack>
          </HStack>
          <Button
            mt={4}
            variant="solid"
            colorScheme="blue"
            backgroundColor="blue.100"
            borderRadius="full"
            onPress={() => setModalVisible(true)}
            w="100%"
          >
            <HStack
              alignItems="center"
              justifyContent="space-between"
              space={2}
            >
              <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                Add Expense
              </Text>
              <Icon
                as={Ionicons}
                size="2xl"
                name="ios-add"
                _dark={{
                  color: "white",
                }}
                color="blue.500"
              />
            </HStack>
          </Button>
          <AddExpenseModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            personId={id}
          />
        </>
      )}
    </Layout>
  );
}
