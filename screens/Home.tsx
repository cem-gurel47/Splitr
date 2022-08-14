import React, { useState } from "react";
import {
  HStack,
  useDisclose,
  Stagger,
  IconButton,
  Icon,
  Box,
  Text,
  Center,
} from "native-base";
import Layout from "@components/Box/Layout";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import PersonBox from "@components/Box/PersonBox";
import DeleteAllUsersAlert from "@components/Alerts/DeleteAllUsersAlert";
import DeleteAllExpensesAlert from "@components/Alerts/DeleteAllExpensesAlert";
import AddUserAlert from "@components/Modals/AddUserModal";
import AddExpenseAlert from "@components/Modals/AddExpenseModal";
import { useNavigation } from "@react-navigation/native";

const PERSON_DATA = [
  {
    id: 1,
    name: "John Doe",
    amount: 100,
    currency: "USD",
  },
  {
    id: 2,
    name: "Jane Doe",
    amount: 200,
    currency: "USD",
  },
];

type NavigationProps = {
  navigate: (name: string) => void;
};

export default function Home() {
  const [isDeleteUsersAlertVisible, setIsDeleteUsersAlertVisible] =
    useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDeleteExpensesAlertVisible, setIsDeleteExpensesAlertVisible] =
    useState(false);
  const [isAddExpenseAlertVisible, setIsAddExpenseAlertVisible] =
    useState(false);
  const { isOpen, onToggle } = useDisclose();
  const navigation = useNavigation<NavigationProps>();

  if (PERSON_DATA.length === 0) {
    return (
      <Layout>
        <Center backgroundColor="blueGray.300" flex={1}>
          <Text fontSize="4xl">Welcome to GermanStyla</Text>
        </Center>
        <Box
          style={{
            position: "absolute",
            bottom: 50,
            right: 30,
          }}
        >
          <HStack justifyContent="center">
            <IconButton
              mb="4"
              variant="solid"
              bg="green.400"
              colorScheme="teal"
              borderRadius="full"
              onPress={() => {
                setModalVisible(true);
              }}
              icon={
                <Icon
                  as={Ionicons}
                  _dark={{
                    color: "warmGray.50",
                  }}
                  size="6"
                  name="person-add"
                  color="warmGray.50"
                />
              }
            />
          </HStack>
        </Box>
        <AddUserAlert
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </Layout>
    );
  }

  return (
    <Layout
      style={{
        position: "relative",
      }}
      onPress={() => {
        if (isOpen) {
          onToggle();
        }
      }}
    >
      {PERSON_DATA.map((person) => (
        <PersonBox
          name={person.name}
          amount={person.amount}
          currency="USD"
          key={person.id}
        />
      ))}
      <Box
        style={{
          position: "absolute",
          bottom: 50,
          right: 30,
        }}
      >
        <Box alignItems="center">
          <Stagger
            visible={isOpen}
            initial={{
              opacity: 0,
              scale: 0,
              translateY: 34,
            }}
            animate={{
              translateY: 0,
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                mass: 0.8,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
            exit={{
              translateY: 34,
              scale: 0.5,
              opacity: 0,
              transition: {
                duration: 100,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
          >
            <IconButton
              mb="4"
              variant="solid"
              bg="indigo.500"
              colorScheme="indigo"
              borderRadius="full"
              onPress={() => {
                setIsDeleteUsersAlertVisible(true);
              }}
              icon={
                <Icon
                  as={AntDesign}
                  size="6"
                  name="deleteusergroup"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="warmGray.50"
                />
              }
            />
            <IconButton
              mb="4"
              variant="solid"
              bg="teal.400"
              colorScheme="teal"
              borderRadius="full"
              onPress={() => {
                setModalVisible(true);
              }}
              icon={
                <Icon
                  as={Ionicons}
                  _dark={{
                    color: "warmGray.50",
                  }}
                  size="6"
                  name="person-add"
                  color="warmGray.50"
                />
              }
            />
            <IconButton
              mb="4"
              variant="solid"
              bg="red.500"
              colorScheme="red"
              borderRadius="full"
              onPress={() => {
                setIsDeleteExpensesAlertVisible(true);
              }}
              icon={
                <Icon
                  as={MaterialIcons}
                  size="6"
                  name="money-off"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="warmGray.50"
                />
              }
            />
            <IconButton
              mb="4"
              variant="solid"
              bg="yellow.400"
              colorScheme="yellow"
              borderRadius="full"
              onPress={() => {
                navigation.navigate("Final Report");
              }}
              icon={
                <Icon
                  as={MaterialIcons}
                  _dark={{
                    color: "warmGray.50",
                  }}
                  size="6"
                  name="calculate"
                  color="warmGray.50"
                />
              }
            />
            <IconButton
              mb="4"
              variant="solid"
              bg="green.500"
              colorScheme="red"
              borderRadius="full"
              onPress={() => {
                setIsAddExpenseAlertVisible(true);
              }}
              icon={
                <Icon
                  as={MaterialIcons}
                  size="6"
                  name="attach-money"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="warmGray.50"
                />
              }
            />
          </Stagger>
        </Box>
        <HStack justifyContent="center">
          <IconButton
            variant="solid"
            borderRadius="full"
            size="lg"
            onPress={onToggle}
            bg="cyan.400"
            icon={
              <Icon
                as={MaterialCommunityIcons}
                size="6"
                name="dots-horizontal"
                color="warmGray.50"
                _dark={{
                  color: "warmGray.50",
                }}
              />
            }
          />
        </HStack>
      </Box>
      <DeleteAllUsersAlert
        isOpen={isDeleteUsersAlertVisible}
        setIsOpen={setIsDeleteUsersAlertVisible}
      />
      <DeleteAllExpensesAlert
        isOpen={isDeleteExpensesAlertVisible}
        setIsOpen={setIsDeleteExpensesAlertVisible}
      />
      <AddUserAlert
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <AddExpenseAlert
        modalVisible={isAddExpenseAlertVisible}
        setModalVisible={setIsAddExpenseAlertVisible}
      />
    </Layout>
  );
}
