import React, { useState, useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import AddExpenseHeader from "@components/Headers/AddExpenseHeader";
import Layout from "@components/Box/Layout";
import {
  Button,
  Center,
  Input,
  Text,
  FormControl,
  Select,
  CheckCircleIcon,
  WarningOutlineIcon,
} from "native-base";
import { useRoute, RouteProp } from "@react-navigation/native";
import formatter from "@utils/formatter";
import Toast from "react-native-toast-message";

const AddExpense = () => {
  const { updatePerson, currency, persons, getExpenses } =
    useContext(ExpenseContext);
  const route: RouteProp<{
    params: {
      personId?: number;
    };
  }> = useRoute();
  const { personId } = route.params;
  const [selectedPerson, setSelectedPerson] = useState<number>(
    personId || persons[0].id
  );
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<string | undefined>();
  const [formattedAmount, setFormattedAmount] = useState<string | undefined>();
  const [isAmountEmpty, setIsAmountEmpty] = useState(false);
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addExpenseToPerson = () => {
    const personToUpdate = persons.find(
      (person) => person.id === selectedPerson
    );
    if (personToUpdate && amount) {
      const newExpenses = [
        ...personToUpdate.expenses,
        { description, amount: parseFloat(amount) },
      ];
      updatePerson(selectedPerson, personToUpdate.name, newExpenses);
      getExpenses();
    }
  };

  const onPress = () => {
    setIsLoading(true);
    const amountEmpty = amount === undefined || amount.length === 0;
    const descriptionEmpty = description.length === 0;
    setFormattedAmount(formatter(parseFloat(amount || "invalid"), currency));
    setIsAmountEmpty(amountEmpty);
    setIsDescriptionEmpty(descriptionEmpty);
    if (Number.isNaN(formattedAmount) || descriptionEmpty || amountEmpty) {
      setIsLoading(false);
      return;
    }
    addExpenseToPerson();
    setIsLoading(false);
    const selectedPersonName = persons.find(
      (p) => p.id === selectedPerson
    )?.name;
    Toast.show({
      type: "success",
      text1: "Expense added 🚀",
      text2: `${formatter(
        parseFloat(amount),
        currency
      )} is added to ${selectedPersonName}.`,
    });
    setDescription("");
    setAmount(undefined);
  };

  return (
    <Layout
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
      }}
    >
      <AddExpenseHeader />
      <Center px={12}>
        <FormControl>
          <FormControl.Label isRequired>Person</FormControl.Label>
          <Select
            nativeID="person"
            size="xl"
            variant="unstyled"
            borderWidth={0}
            style={{
              borderBottomColor: "#9196F3",
              borderBottomWidth: 1,
              width: "100%",
            }}
            selectedValue={
              selectedPerson ? selectedPerson.toString() : undefined
            }
            _selectedItem={{
              bg: "transparent",
              endIcon: <CheckCircleIcon size="5" />,
            }}
            onValueChange={(value) => {
              setSelectedPerson(Number(value));
            }}
          >
            {persons.map((person) => (
              <Select.Item
                key={`person-${person.id}`}
                label={person.name}
                value={person.id.toString()}
              >
                {person.name}
              </Select.Item>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormControl.Label isRequired>Description</FormControl.Label>
          <Input
            placeholder="Ex: Lunch at McDonalds"
            value={description}
            size="xl"
            style={{
              borderBottomColor: "#9196F3",
              color: "#9196F3",
            }}
            variant="underlined"
            autoFocus
            onChange={(e) => {
              if (e.nativeEvent.text.length !== 0) {
                setIsDescriptionEmpty(false);
              } else {
                setIsDescriptionEmpty(true);
              }
              setDescription(e.nativeEvent.text);
            }}
          />
          <FormControl.ErrorMessage
            isInvalid={isDescriptionEmpty}
            leftIcon={<WarningOutlineIcon size="xs" />}
          >
            Description is required
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl>
          <FormControl.Label isRequired>Amount</FormControl.Label>
          <Input
            size="xl"
            type="number"
            placeholder="0.00"
            keyboardType="decimal-pad"
            style={{
              borderBottomColor: "#9196F3",
              color: "#9196F3",
            }}
            variant="underlined"
            value={amount || ""}
            onChange={(e) => {
              if (e.nativeEvent.text.length !== 0) {
                setIsAmountEmpty(false);
              } else {
                setIsAmountEmpty(true);
              }
              setAmount(e.nativeEvent.text);
            }}
          />
          <FormControl.ErrorMessage
            isInvalid={isAmountEmpty}
            leftIcon={<WarningOutlineIcon size="xs" />}
          >
            Amount is required
          </FormControl.ErrorMessage>
          <FormControl.ErrorMessage
            isInvalid={Number.isNaN(formattedAmount)}
            leftIcon={<WarningOutlineIcon size="xs" />}
          >
            Amount must be a valid number
          </FormControl.ErrorMessage>
        </FormControl>
        <Button
          isLoading={isLoading}
          isLoadingText="Loading"
          disabled={isLoading}
          w="100%"
          mt={8}
          variant="outline"
          py={2}
          borderRadius="2xl"
          style={{
            borderColor: "#9196F3",
          }}
          onPress={onPress}
        >
          <Text
            style={{
              color: "#9196F3",
            }}
            fontWeight="bold"
            fontSize="xl"
          >
            Add Expense
          </Text>
        </Button>
      </Center>
    </Layout>
  );
};

export default AddExpense;
