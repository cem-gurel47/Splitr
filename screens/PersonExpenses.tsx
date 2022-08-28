import React, { useEffect, useContext } from "react";
import { FlatList } from "react-native";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { Text, HStack, Center, Icon, Button } from "native-base";
import Layout from "@components/Box/Layout";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Person } from "@models/person";
import AnimatedLottieView from "lottie-react-native";
import ScanningAnimation from "../assets/scanning.json";
import { Ionicons } from "@expo/vector-icons";
import PersonExpensesHeader from "@components/Headers/PersonExpensesHeader";
import PersonNoDataHeader from "@components/Headers/PersonNoDataHeader";
import PersonExpense from "@components/Box/PersonExpense";

const NoData = ({ id, name }: { id: number; name: string }) => {
  const navigation = useNavigation();

  return (
    <>
      <PersonNoDataHeader name={name} />
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
          p={4}
          variant="solid"
          colorScheme="blue"
          backgroundColor="#787DE8"
          borderRadius="full"
          onPress={() =>
            navigation.navigate("Add New Expense", {
              personId: id,
            })
          }
          justifyContent="flex-start"
        >
          <HStack alignItems="center" justifyContent="space-between" space={2}>
            <Text color="white" fontSize="lg" fontWeight="semibold">
              Add Expense
            </Text>
            <Icon
              as={Ionicons}
              size="xl"
              name="ios-add"
              _dark={{
                color: "white",
              }}
              color="white"
            />
          </HStack>
        </Button>
      </Center>
    </>
  );
};

export default function PersonExpenses() {
  const navigation = useNavigation();
  const route: RouteProp<{
    params: Person;
  }> = useRoute();
  const { name, id } = route.params;
  const { persons } = useContext(ExpenseContext);
  const person = persons.find((person) => person.id === id);
  const expenses = person?.expenses ?? [];

  useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
    });
  }, []);

  return (
    <Layout
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
      }}
    >
      {expenses.length === 0 ? (
        <NoData id={id} name={name} />
      ) : (
        <>
          <FlatList
            style={{ flexGrow: 0 }}
            data={expenses}
            renderItem={({ item, index }) => (
              <PersonExpense
                personId={id}
                expense={item}
                index={index}
                key={`${item.description}-${index}`}
              />
            )}
            ListHeaderComponent={() => <PersonExpensesHeader name={name} />}
            ListFooterComponent={() => (
              <Center>
                <Button
                  p={4}
                  variant="solid"
                  colorScheme="blue"
                  backgroundColor="#787DE8"
                  borderRadius="full"
                  onPress={() =>
                    navigation.navigate("Add New Expense", {
                      personId: id,
                    })
                  }
                  justifyContent="flex-start"
                >
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    space={2}
                  >
                    <Text color="white" fontSize="lg" fontWeight="semibold">
                      Add Expense
                    </Text>
                    <Icon
                      as={Ionicons}
                      size="xl"
                      name="ios-add"
                      _dark={{
                        color: "white",
                      }}
                      color="white"
                    />
                  </HStack>
                </Button>
              </Center>
            )}
            keyExtractor={(item, index) => `${item.description}-${index}`}
          />
        </>
      )}
    </Layout>
  );
}
