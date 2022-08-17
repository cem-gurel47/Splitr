import React, { useContext, useState } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import {
  Button,
  FormControl,
  Input,
  Select,
  WarningOutlineIcon,
  CheckCircleIcon,
  Actionsheet,
  Container,
} from "native-base";
import formatter from "@utils/formatter";

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  personId?: number;
};

function AddExpenseModal({ modalVisible, setModalVisible, personId }: Props) {
  const { updatePerson, currency, persons, getExpenses } =
    useContext(ExpenseContext);
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

  return (
    <>
      <Actionsheet isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Actionsheet.Content pb={6} px={0} w="full">
          <Container w="full">
            <FormControl>
              <FormControl.Label isRequired>Person</FormControl.Label>
              <Select
                nativeID="person"
                size="xl"
                variant="rounded"
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
              isLoadingText="Adding"
              variant="outline"
              colorScheme="green"
              mt={4}
              w="full"
              onPress={() => {
                setIsLoading(true);
                const amountEmpty = amount === undefined || amount.length === 0;
                const descriptionEmpty = description.length === 0;
                setFormattedAmount(
                  formatter(parseFloat(amount || "invalid"), currency)
                );
                setIsAmountEmpty(amountEmpty);
                setIsDescriptionEmpty(descriptionEmpty);
                if (
                  Number.isNaN(formattedAmount) ||
                  descriptionEmpty ||
                  amountEmpty
                ) {
                  setIsLoading(false);
                  return;
                }
                addExpenseToPerson();
                setIsLoading(false);
                setModalVisible(false);
              }}
            >
              Save
            </Button>
          </Container>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

export default AddExpenseModal;
