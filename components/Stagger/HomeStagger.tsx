import React, { useState } from "react";
import {
  Box,
  Stagger,
  IconButton,
  Icon,
  HStack,
  Text,
  Button,
} from "native-base";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  DeleteAllExpensesAlert,
  DeleteAllUsersAlert,
} from "@components/Alerts";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

type ItemProps = {
  onPress: () => void;
  icon: JSX.Element;
  label: string;
  backgroundColor: string;
};

const StaggerItem = ({ onPress, icon, label, backgroundColor }: ItemProps) => {
  return (
    <Button
      mb={4}
      py={2}
      backgroundColor={backgroundColor}
      borderRadius="3xl"
      onPress={onPress}
      justifyContent="flex-start"
    >
      <HStack alignItems="center" justifyContent="space-between" width="40">
        <Text color="warmGray.50">{label}</Text>
        {icon}
      </HStack>
    </Button>
  );
};

const HomeStagger = ({ isOpen, onToggle }: Props) => {
  const navigation = useNavigation();
  const [isDeleteUsersAlertVisible, setIsDeleteUsersAlertVisible] =
    useState(false);
  const [isDeleteExpensesAlertVisible, setIsDeleteExpensesAlertVisible] =
    useState(false);

  const STAGGER_ITEMS = [
    {
      onPress: () => {
        setIsDeleteUsersAlertVisible(true);
      },
      backgroundColor: "indigo.500",
      icon: (
        <Icon
          as={AntDesign}
          size="6"
          name="deleteusergroup"
          _dark={{
            color: "warmGray.50",
          }}
          color="warmGray.50"
        />
      ),
      label: "Delete Users",
    },
    {
      onPress: () => {
        navigation.navigate("Add New Person");
      },
      backgroundColor: "teal.400",
      icon: (
        <Icon
          as={Ionicons}
          _dark={{
            color: "warmGray.50",
          }}
          size="6"
          name="person-add"
          color="warmGray.50"
        />
      ),
      label: "Add Person",
    },
    {
      onPress: () => {
        setIsDeleteExpensesAlertVisible(true);
      },
      backgroundColor: "red.500",
      icon: (
        <Icon
          as={MaterialIcons}
          size="6"
          name="money-off"
          _dark={{
            color: "warmGray.50",
          }}
          color="warmGray.50"
        />
      ),
      label: "Delete Expenses",
    },
    {
      onPress: () => {
        navigation.navigate("Final Report");
      },
      backgroundColor: "yellow.400",
      icon: (
        <Icon
          as={MaterialIcons}
          _dark={{
            color: "warmGray.50",
          }}
          size="6"
          name="calculate"
          color="warmGray.50"
        />
      ),
      label: "Calculate",
    },
    {
      onPress: () => {
        navigation.navigate("Add New Expense", {});
      },
      backgroundColor: "green.500",
      icon: (
        <Icon
          as={MaterialIcons}
          size="6"
          name="attach-money"
          _dark={{
            color: "warmGray.50",
          }}
          color="warmGray.50"
        />
      ),
      label: "Add Expense",
    },
  ];

  return (
    <Box position="absolute" bottom="10%" right="10%" alignItems="flex-end">
      <Box>
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
          {STAGGER_ITEMS.map((item) => (
            <StaggerItem {...item} key={item.label} />
          ))}
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
              size="xl"
              name="dots-horizontal"
              color="warmGray.50"
              _dark={{
                color: "warmGray.50",
              }}
            />
          }
        />
      </HStack>
      <DeleteAllUsersAlert
        isOpen={isDeleteUsersAlertVisible}
        setIsOpen={setIsDeleteUsersAlertVisible}
      />
      <DeleteAllExpensesAlert
        isOpen={isDeleteExpensesAlertVisible}
        setIsOpen={setIsDeleteExpensesAlertVisible}
      />
    </Box>
  );
};

export default HomeStagger;
